
import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { PwaInstaller } from '../widget';
import {saveAuthInfo} from '../../redux/common';
import {login} from '../../axios'
import {connect} from 'react-redux'

const FormItem = Form.Item;

@connect(state => {
  console.log(state)
    return {
        auth: state.default.auth
        }
}, {saveAuthInfo})

class Login extends Component {
  constructor(props) {
    super(props)
      this.state = {
          auth: '',
          title: '',
      };

    }
    componentDidMount() {
        // console.log(this)

    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
      //console.log('zzy')
        const { auth: nextAuth = {}, history } = this.props;
          // console.log(nextAuth)
        if (nextAuth && nextAuth.uid) { // 判断是否登陆

            localStorage.setItem('user', JSON.stringify(nextAuth.userName));
            localStorage.setItem('usertokentime', new Date().getTime());
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(values.userName!='admin' &&values.password!='admin' ){
                    message.info('用户名或密码不正确，请重新输入！');
                }else{
                  login(values).then(res=>{
                      this.props.saveAuthInfo(res)
                  })
                }

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>北极星BI报表</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
