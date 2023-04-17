<template>
  <el-form>
    <el-form-item label="OldPassword">
      <el-input v-model.trim="form.oldPassword" type="password" />
    </el-form-item>
    <el-form-item label="NewPassword">
      <el-input v-model.trim="form.newPassword" type="password" />
    </el-form-item>
    <el-form-item label="NewPasswordAgain">
      <el-input v-model.trim="form.newPasswordAgain" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPassword } from '@/api/home'
import { encryptPassword } from '@/utils/auth'
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    }
  },
  methods: {
    async submit() {
      console.log(this.form)
      if (this.newPassword !== this.newPasswordAgain) {
        this.$message({
          message: 'Twice password is not the same',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      var updateForm = this.clone(this.form)
      var loginName = this.user.phoneNumber
      updateForm.oldPassword = await encryptPassword(loginName, this.form.oldPassword)
      updateForm.newPassword = await encryptPassword(loginName, this.form.newPassword)
      updateUserPassword(updateForm).then(response => {
        console.log(response)
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }).catch(error => {
        console.log(error)
      })

      // this.$message({
      //   message: 'User information has been updated successfully',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
    }
  }
}
</script>
