import ColumnContainer from "./ColumnContainer";
import styles from "./css/rowcontainer.module.css"

export default function RowContainer(props) {
  const { medical = {}, nutrition = {} } = props;
  
  if (Object.entries(medical).length > 0) {
    const keys = Object.keys(medical);
    const html = keys.map(key => (
        <ColumnContainer
          key={key}
          name={key}
          value={medical[key]}
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
          value={nutrition[key] || ''}
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
