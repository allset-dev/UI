interface Manger {
  name: string;
  salary: number;
  subordinates: Manger[];
}

interface ExtraData {
  salaryIncreased: number;
  noOfUnderPaidManager: number;
}

interface MutateManagerSalaryProps {
  manager: Manger;
  extraData: ExtraData;
}

function mutateManagerSalary(props: MutateManagerSalaryProps) {
  const { manager, extraData } = props;
  const subordinates = manager.subordinates;

  if (subordinates.length) {
    const subordinatesTotalSalary = subordinates.reduce((acc, sub) => {
      return (acc += mutateManagerSalary({ manager: sub, extraData }));
    }, 0);

    const subordinatescumulative = subordinatesTotalSalary / subordinates.length;

    if (subordinatescumulative >= manager.salary) {
      extraData.salaryIncreased += subordinatescumulative - manager.salary;
      extraData.noOfUnderPaidManager += 1;
      manager.salary = subordinatescumulative;
    }
  }

  return manager.salary;
}

function updateManagerSalary(manager: Manger): MutateManagerSalaryProps {
  const managerCloned: Manger = JSON.parse(JSON.stringify(manager));
  const extraData: ExtraData = { salaryIncreased: 0, noOfUnderPaidManager: 0 };

  const data = { manager: managerCloned, extraData };
  mutateManagerSalary(data);

  return data;
}

const manager: Manger = {
  name: 'John Doe',
  salary: 5000,
  subordinates: [
    {
      name: 'Jane Doe',
      salary: 6000,
      subordinates: [
        {
          name: 'Jane Doe1',
          salary: 7000,
          subordinates: [],
        },
        {
          name: 'Jane Doe2',
          salary: 7000,
          subordinates: [],
        },
      ],
    },
    {
      name: 'Jim Smith',
      salary: 6000,
      subordinates: [],
    },
  ],
};

export default function GoogleInterview() {
  console.log('initial managers pay', manager);
  console.log('updated managers pay', updateManagerSalary(manager));

  return null;
}
