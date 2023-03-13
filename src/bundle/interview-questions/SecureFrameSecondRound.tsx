export default function SecureFrameSecondRound(): JSX.Element {
  // const _ = require('lodash');

  // function sayHello() {
  //   console.log('Hello, World');
  // }

  // _.times(5, sayHello);

  /**
 Secureframe integrates with various SaaS providers to
ingest and normalize employee data. We have many different types of
integrations, including HR Providers (e.g. Gusto), Office Suites (e.g. GSuite),
Version Control Systems (e.g. Github), and Ticket Management Systems (e.g. Trello). 

Imagine that every night, we run a sync job that fetches and standardizes user
information from these four providers. However, we get back conflicting data
from these services and we want to prioritize different fields from different
services. For example, we want to prioritize titles from Gsuite over Gusto.

There are a few things that will always remain true due to how we are 
standardizing data. 

The data will be a list of objects with keys:
  * `vendor` (string, name of integration, required)
  * `company_name` (string, name of company, required)
  * `name` (string, name of user, required)
  * `active` (boolean, whether the user is currently employed)
  * `title` (string, job title)
  * `employee_type` (string, employee or contractor)
  * `date_of_birth` (ISO8601 timestamp)

Uniqueness:
  * `company_name` will always be unique for a given company
  * `name` will always be unique for a given employee.

We want to merge data according to the following rules:
* Only pull `date_of_birth` from Gusto
* Prioritize pulling `title` from GSuite > Gusto > Any other integration
* Only pull `employee_type` from GSuite and Gusto, and prioritize Gusto > GSuite
* If `active` is true in any vendor, it should be true. Otherwise, it should false.
* The attribute `vendors` should be a list of all vendors we find this user in

Write a function that takes as input a list of data pulled from integrations, and 
returns the merged employee data.
 * 
 */

  // [
  //   {
  //     "vendors": [
  //       "gusto",
  //       "gsuite",
  //       "trello"
  //     ],
  //     "company_name": "Company",
  //     "name": "John Doe",
  //     "active": true,
  //     "title": "CEO",
  //     "employee_type": "employee",
  //   },
  //   {
  //     "vendors": [
  //       "gusto"
  //     ],
  //     "company_name": "Company",
  //     "name": "Adam Doe",
  //     "active": true,
  //     "title": "CTO",
  //     "employee_type": "employee"
  //   }
  // ]

  const input: EmployeeDataRes[] = [
    {
      vendor: 'gusto',
      company_name: 'Company',
      name: 'John Doe',
      title: 'Admin',
      employee_type: 'employee',
      date_of_birth: '2021-01-25T15:14:53+0000',
    },
    {
      vendor: 'gsuite',
      company_name: 'Company',
      name: 'John Doe',
      title: 'CEO',
      employee_type: 'employee',
      date_of_birth: '2020-01-25T15:14:53+0000',
    },
    {
      vendor: 'trello',
      company_name: 'Company',
      name: 'John Doe',
      employee_type: 'employee',
      title: 'Engineer',
    },
    {
      vendor: 'gusto',
      company_name: 'Company',
      name: 'Adam Doe',
      active: true,
      title: 'CTO',
      employee_type: 'employee',
    },
  ];

  function mapEmployeeData(employeeData: EmployeeDataRes[]) {
    const employees: ParsedEmployeeData = employeeData.reduce((acc, data) => {
      return {
        ...acc,
        [data.name]: {
          [data.vendor]: data,
          ...(acc[data.name] || {}),
        },
      };
    }, {} as ParsedEmployeeData);

    return Object.entries(employees).map(([employeeName, employeeProfiles]) => {
      const employeeProfilesArray = Object.values(employeeProfiles);

      const company_name = employeeProfilesArray.find(
        ({ company_name }) => company_name
      )?.company_name;
      const active = employeeProfilesArray.find(({ active }) => active);

      const parsedEmployee: EmployeeData = {
        vendors: Object.keys(employeeProfiles),
        company_name,
        name: employeeName,
        active: Boolean(active),
        title:
          employeeProfiles['gsuite']?.title ||
          employeeProfiles['gusto']?.title ||
          employeeProfilesArray.find(({ title }) => title)?.title,
        employee_type:
          employeeProfiles['gsuite']?.employee_type || employeeProfiles['gusto']?.employee_type,
      };

      if (employeeProfiles['gusto']?.date_of_birth) {
        parsedEmployee.date_of_birth = employeeProfiles['gusto']?.date_of_birth;
      }

      return parsedEmployee;
    });
  }

  console.clear();
  console.log('parseEmployeeData', mapEmployeeData(input));

  function parseEmployeeData(employeeData: EmployeeDataRes[]) {
    const employees = employeeData.reduce((acc, data) => {
      const employee: EmployeeData = acc[data.name] || {
        vendors: [],
        company_name: '',
        name: '',
        active: false,
        title: '',
        employee_type: '',
      };

      employee.vendors.push(data.vendor);
      employee.active = data.active || employee.active;
      employee.company_name = data.company_name || employee.company_name;
      employee.name = data.name || employee.name;
      employee.title = data.title || employee.title;
      employee.employee_type = data.employee_type || employee.employee_type;

      if (data.date_of_birth) {
        employee.date_of_birth = data.date_of_birth || employee.date_of_birth;
      }

      return { ...acc, [data.name]: employee };
    }, {} as { [ley: string]: EmployeeData });

    return Object.values(employees);
  }

  console.log('parseEmployeeDatagpt', parseEmployeeData(input));

  return null;
}

interface EmployeeDataRes {
  vendor: string;
  company_name: string;
  name: string;
  active?: boolean;
  title: string;
  employee_type: string;
  date_of_birth?: string;
}

interface ParsedEmployeeData {
  [key: string]: {
    [key: string]: EmployeeDataRes;
  };
}

interface EmployeeData {
  vendors: string[];
  company_name: string;
  name: string;
  active: boolean;
  title: string;
  employee_type: string;
  date_of_birth?: string;
}
