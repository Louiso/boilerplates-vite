import { makeStyles } from '@mui/styles';

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt="loading" src="https://cdn.krowdy.com/images/loader.gif" />
    </div>
  );
};

const useStyles = makeStyles(
  () => ({
    root: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  }),
  { name: 'Loading' },
);

export default Loading;
