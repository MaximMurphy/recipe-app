// Loading Spinner

type Props = {
  show: boolean;
};

export const Loader: React.FC<Props> = (show) => {
  return show ? <div className="loader"></div> : null;
};
