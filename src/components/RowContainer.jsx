import ColumnContainer from "./ColumnContainer";
import styles from "./css/rowcontainer.module.css"

export default function RowContainer(props) {
  const { medical = {}, nutrition = {}, exercise = {} } = props;
  
  if (Object.entries(medical).length > 0) {

    const keys = Object.keys(medical);
    const html = keys.map(key => (
        <ColumnContainer
          key={key}
          name={key}
          value={medical[key]}
          withInputs={props?.withInputs || false}
        />
      ));
      
      return (
        <div className={styles.container}>
            {html}
        </div>
      );
  } else if (Object.entries(nutrition).length > 0) {
    const keys = Object.keys(nutrition);
    const html = keys.map(key => (
        <ColumnContainer
          key={key}
          name={key}
          value={nutrition[key]}
          withInputs={props?.withInputs || false}
        />
      ));
      
      return (
        <div className={styles.container}>
            {html}
        </div>
      );
  } else if (Object.entries(exercise).length > 0) {
    const keys = Object.keys(exercise);
    const html = keys.map(key => (
        <ColumnContainer
          key={key}
          name={key}
          value={exercise[key]}
          withInputs={props?.withInputs || false}
        />
      ));
      
      return (
        <div className={styles.container}>
            {html}
        </div>
      );
  }
  
  return null;
}
