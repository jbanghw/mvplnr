import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
}

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  )
}

export default Spinner