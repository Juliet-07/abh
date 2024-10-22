import { ArrowLeftIcon, ArrowUpIcon } from "@heroicons/react/solid";
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import PaginatedTable from "../../components/paginatedTables";
import UserActivityPaginatedTable from "../../components/UaerActivityTable";

function UsersActivity() {
  let { type } = useParams();
  let router = useNavigate();
  const [Search, setLSI] = React.useState("");
  

  let formatedType = `${type[0]}`.toUpperCase() + `${type}`.substring(1);

  return (

    <div className="font-primarySemibold flex flex-col gap-[20px]">
      <header className="w-full absolute top-0 flex flex-row gap-4 items-center h-[70px]">
        <ArrowLeftIcon width={20} height={20} onClick={() => router(-1)} /> <b>{formatedType}  Users</b>
      </header>

      <div className="bg-white rounded-[0.5rem] border-[1px] h-[103px] justify-center p-4 flex flex-col ">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Total {formatedType} Users (1021)</p>

            <div className="flex flex-1 max-w-[400px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by page name"
                onInput={(e) => setLSI(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        </div>

        <div className="w-full flex flex-row gap-4 ">
            <div className="w-[200px] h-[106px] rounded-[4px] border bg-white flex items-center justify-center flex-col gap-2">
                <p>Average Sessions</p>
                <div className="flex flex-row items-center gap-4">
                <b>4200</b>
                <div className="flex flex-row items-center justify-center gap-2 rounded-[4px] bg-green-100 text-[green]"><p>8.1%</p> <ArrowUpIcon width={10} height={10} /></div>
                </div>
            </div>
            <div className="w-[200px] h-[106px] rounded-[4px] border bg-white flex items-center justify-center flex-col gap-2">
                <p>Average Sessions</p>
                <div className="flex flex-row items-center gap-4">
                <b>4200</b>
                <div className="flex flex-row items-center justify-center gap-2 rounded-[4px] bg-green-100 text-[green]"><p>8.1%</p> <ArrowUpIcon width={10} height={10} /></div>
                </div>
            </div>
        </div>

        <div className="w-full min-h-[500px] bg-white rounded-[4px] border">
            <UserActivityPaginatedTable tableHead={["Active pages", "Users", "Session", "Session duration"]}
            searchText={Search} 
            maxItems={10} tableData={[{pageName: "/active"},{pageName: "/users"}, {pageName: "/users/active"}, {pageName: "/dashboard"}, {pageName: "/customers"}, {pageName: "/users/vendors"}, {pageName: "/orders"}, {pageName: "/users/active"}, {pageName: "/dashboard"}, {pageName: "/customers"}, {pageName: "/users/vendors"}, {pageName: "/orders"}]} />
        </div>


    </div>
  );
}

export default UsersActivity;
