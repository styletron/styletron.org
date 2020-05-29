import {useStyletron} from "styletron-react";

export function Notification({children}) {
  const [css] = useStyletron();
  return (
    <div className={css({
      backgroundColor: '#EFF3FE',
      color: '#1E54B7',
      fontWeight: 'bold',
      fontSize: '0.9em',
      padding: '1em'
    })}>
      {children}
    </div>
  );
}
