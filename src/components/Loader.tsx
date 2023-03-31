type Props = {
  show: boolean;
};

// Loading Spinner
export const Loader: React.FC<Props> = (show) => {
  return show ? <div className="loader"></div> : null;
};
