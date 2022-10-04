import { Link } from "react-router-dom";
import "./index.scss";

const PreviewProject = (props: { data: any }) => {
  return (
    <Link
      to={`/project/${props.data.id}`}
      state={{ infoProject: props.data }}
      className="previewProject card p-3"
    >
      <div className="card-content">
        <p className="title is-size-6 mb-1">{props.data.name}</p>
        <p className="subtitle">Subtitle</p>
        <div className="content mb-1 is-flex is-justify-content-space-between is-align-items-center">
          <p>Created</p>
          <p className="tag is-success is-light">01 october 2022</p>
        </div>
        <div className="content mb-1 is-flex is-justify-content-space-between is-align-items-center">
          <p>Techno</p>
          <p className="tag is-warning is-light">xxxx</p>
        </div>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="button is-primary ml-auto">Open</p>
      </div>
    </Link>
  );
};

export default PreviewProject;
