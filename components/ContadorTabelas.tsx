type Props = {
  element: unknown[];
};

export default function Contador({ element }: Props) {
  return element.length;
}
