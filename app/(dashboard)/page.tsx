'use client'

import { EmptyOrganization } from "./_components/empty-organization";
import { useOrganization } from '@clerk/nextjs'
import { BoardList } from './_components/board-list'

interface DashboardProps {
  searchParams: {
    search?: string
    favs?: string
  }
}

const Dashboard = ({ searchParams }: DashboardProps) => {

  const { organization } = useOrganization();

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardList 
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  );
}
 
export default Dashboard;