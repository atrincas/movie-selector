export const header = theme => ({
  appBar: {
    color: '#aaa',
    position: 'relative',
    flexDirection: 'row'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  navBar: {
    '& ul': {
      listStyle: 'none',
        '& li': {
          display: 'inline-block'
        },
          '& a': {
            position: 'relative',
            display: 'block',
            padding: 15,
            textDecoration: 'none',
            color: '#aaa',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 10'
          },
          '& a, a:after, a:before': {
            transition: 'all .5s'
          },
          '& a:hover': {
            color: '#fff'
          }
    }
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  }
});