import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Not authenticated')

    const randomImage = images[Math.floor(Math.random() * images.length)]

    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage
    })

    return board

  }
})

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('not auth')

    const userId = identity.subject
    const existingFav = await ctx.db
      .query('userFavs')
      .withIndex('by_user_board', q => 
        q.eq('userId', userId)
         .eq('boardId', args.id)
      )
      .unique()

    if (existingFav) {
      await ctx.db.delete(existingFav._id)
    }

    await ctx.db.delete(args.id)
  }
})

export const update = mutation({
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('not authorized')

    const title = args.title.trim()
    if (!title) throw new Error('title is required')
    if (title.length > 60) throw new Error('Title cannot be more than 60')

    const board = await ctx.db.patch(args.id, {
      title: args.title
    })

    return board
  }
})

export const favourite = mutation({
  args: {
    id: v.id('boards'),
    orgId: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('not auth')

    const board = await ctx.db.get(args.id)

    if (!board) throw new Error('Board not found')

    const userId = identity.subject

    const existingFav = await ctx.db
      .query('userFavs')
      .withIndex('by_user_board_org', q => q.eq('userId', userId).eq('boardId', board._id).eq('orgId', args.orgId))
      .unique();

    if (existingFav) throw new Error('already fav exists')

    await ctx.db.insert('userFavs', {
      userId,
      orgId: args.orgId,
      boardId: board._id
    })

    return board

  }
})

export const unfavourite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavs")
      .withIndex("by_user_board", (q) => 
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id)
    return board
  }
})