import { InputNumberProps } from "antd";

const formatterMoney: InputNumberProps<number>['formatter'] = (value) => {
  const [start, end] = `${value}`.split('.') || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${end ? `${v}.${end}` : `${v}`}`;
};

export { formatterMoney };