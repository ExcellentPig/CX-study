import React from 'react';
import MaterialUICard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
    },
    card: {
        width: 300
    },
    media: {
        height: 200,
        width: 300,
        objectFit: 'cover',
    }
});

class MyCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                {/*添加点击事件，触发动画*/}
                <MaterialUICard className={this.props.classes.card}>
                    <CardMedia
                        component='img'
                        className={this.props.media}
                        image={this.props.image}
                        title={this.props.title}
                        height='200'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography component="p">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={this.props.classes.actions}>
                        <Button size="small" color="primary" variant="outlined">
                            联系方式：🐟🐡🐭🦆 Dereck
                        </Button>
                    </CardActions>
                </MaterialUICard>
            </div>
        );
    }
}

export default withStyles(styles)(MyCard);
