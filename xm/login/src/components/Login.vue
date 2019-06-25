<template>
  <div id="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>
        <i class="el-icon-star-off"></i>
        <span>登录页</span>
      </h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/login',{   //将数据(用户信息)提交到后台
              username: this.ruleForm.username,
              password: this.ruleForm.password
            }).then((res) => {  //判断后台返回来的数据
              if(res.data.errno){   //res.data.errno的值为1即为真,根据后台设置,所以对应的是找不到用户,登录失败
                this.$message.error('登录失败,请先注册用户');
                return
              }else{
                this.$message({
                  message: '恭喜您，登录成功',
                  type: 'success'
                });
                this.$router.push("/admin")
                this.$store.commit("saveLoginUser",this.ruleForm.username)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/register',{
              username: this.ruleForm.username,
              password: this.ruleForm.password
            }).then(res => {
              if(res.data.errno){   //res.data.errno的值为1即为真,根据后台设置,该用户已存在,不可以重复注册
                this.$message.error('注册失败,该用户名已被抢先注册');
                return
              }else{
                this.$message({
                  message: '恭喜您，该用户名注册成功',
                  type: 'success'
                });
              }
            })
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 250px;
    padding: 20px 30px 40px 0px;
    margin: auto;
    box-shadow: 0 0 10px 0 blue;
  }

  #login h3 {
    font-size: 28px;
    text-align: center;
    line-height: 70px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
