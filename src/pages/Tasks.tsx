import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import Modal from '../components/Modal.js';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../constants.js';



const Tasks = () => {

  const [taskData, setTaskData] = useState([{job_name: "", next_run: ""}]);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTasks = () => {
    fetch(BASE_URL+'/getTasks')
    .then(response => response.json())
    .then(data => setTaskData(data.jobs))
    .catch(error => console.error('Error fetching blog data:', error));
  }

  useEffect(() => {

    getTasks()
  }, []);

  return (
     <>
      <Breadcrumb pageName="Tasks" />


      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Task Schedule
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Frequency
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Next Run
                </h5>
              </div>
            </div>

            {taskData.map((task, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${key === taskData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                  }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="text-black dark:text-white sm:block">
                    {task.job_name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{task.interval}/week</p>
                </div>


                <div className="  flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white sm:block">{formatDate(task.next_run)}</p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  );
};

export default Tasks;
