import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid, TextField, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { EditorForm, CategorySelect } from './';
import * as R from 'ramda';
import verifyForm from '../../common/verifyForm';
import * as commonActions from '../common/redux/actions';
import { ADD_SUCCESS, SUCCESS, FAILURE } from '../../common/consts';
import getErrorMessage from '../../common/getErrorMessage';
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '98%'
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '98%',
    minHeight: '35%'
  },
  buttonField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'center'
  }
})

export class ArticleForm extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      verify: {
        title: {
          verify: {
            isRequired: true,
            isEmail: true,
            max: 50
          },
          status: false,
          err: ''
        },
        link: {
          verify: {
            isRequired: false,
            max: 200,
          },
          status: false,
          err: ''
        }
      },
      modal: {
        id: null,
        title: '',
        link: '',
        content: '内容',
        categorys: []
      }
    }
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleSaveArticle = this.handleSaveArticle.bind(this)
    this.clearModal = this.clearModal.bind(this)
    this.setData = this.setData.bind(this)
    // this.verifyForm = this.verifyForm.bind(this)
  }

  handleChangeValue(key, value) {
    // let resul = verifyForm.getMessage(value, this.state.verify[key].verify)
    // console.log('verifyForm', resul)
    // this.verifyForm(key, value)
    // 设定
    this.setState({
      modal: R.assoc(key, value, this.state.modal)
    })
  }

  // verifyForm (key, value) {
  //   const {verify} = this.state
  //   const node = verify[key]
  //   // 对节点验证规则逐一处理
  //   const _item = (a, v) => {
  //     console.log('v', v)
  //     switch (v[0]) {
  //       case 'isRequired':
          
  //         break;
      
  //       default:
  //         break;
  //     }
  //     return a
  //   }
  //   const newVerify = R.reduce(_item, node, R.toPairs(node.verify))
  //   console.log('node', newVerify)
  // }

  computedButtonStatus (formStatus) {
    // 取每个节点的status， 并集， 得到TF
    // R.anyPass()
  }

  /**
   * 在提交数据前对数据进行处理
   * 1. 实现对categorys的数据整理
   */
  setData (d) {
    // PlanA
    // const _item = (a, v) => {
    //   const item = R.find(R.propEq('id', v))(this.props.category.categoryTree)
    //   return R.isNil(item) ? a : R.append(item, a)
    // }
    // const categorys = R.reduce(_item, [], d.categorys)
    // return R.assoc('categorys', categorys, d)
    return d
  }

  /**
   * 保存逻辑
   */
  handleSaveArticle() {
    const modal = this.setData(this.state.modal)
    this.props.actions.fetchSaveArticle(modal).then(() => {
      this.props.actions.fetchGetArticleList()
      this.props.actions.fetchGetArticleCount()
      // success
      this.props.commonActions.showMessageBox(ADD_SUCCESS, SUCCESS)
      this.clearModal()
      this.props.onClose()
    }).catch(() => {
      // failure
      this.props.commonActions.showMessageBox(getErrorMessage(this.props.article.fetchSaveArticleError), FAILURE)
    })
  }

  clearModal () {
    this.setState({
      modal: {
        id: null,
        title: '',
        link: '',
        content: '',
        categorys: []
      }
    })
  }

  render() {
    const { classes } = this.props
    const { modal, verify} = this.state
    console.log('modal category is:', modal)
    return (
      <div className="article-article-form">
        <Grid container>
          <Grid item xs={12} className="article-article-form-title">
            <h3>内容管理{`{${R.isNil(modal.id) ? 'New' : modal.id}}`}</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={verify.title.status}
              label="文章标题"
              placeholder="不大于50个字，必填"
              margin="normal"
              className={classes.textField}
              value={modal.title}
              onChange={e => this.handleChangeValue('title', e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="链接地址"
              margin="normal"
              className={classes.textField}
              value={modal.link}
              onChange={e => this.handleChangeValue('link', e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <CategorySelect selectValue={modal.categorys} classes={classes.textField} onChangeValue={this.handleChangeValue}/>
          </Grid>
          <Grid item xs={12} className={classes.contentField}>
            <Paper>
                  <EditorForm
                    content={modal.content}
                    onContentChange={value => this.handleChangeValue('content', value)}
                  ></EditorForm>
            </Paper>
          </Grid>
          <Grid item xs={12} className="article-article-form-button">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonField}
              onClick={this.handleSaveArticle}
            >保 存</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    article: state.article,
    category: state.category,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({ ...commonActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ArticleForm));
