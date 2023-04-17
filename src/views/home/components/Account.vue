<template>
  <el-form>
    <el-form-item label="phoneNumber">
      <el-input v-model.trim="user.phoneNumber" disabled />
    </el-form-item>
    <el-form-item label="username">
      <el-input v-model.trim="user.username" />
    </el-form-item>
    <el-form-item label="realName">
      <el-input v-model.trim="user.realName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserInfo } from '@/api/home'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          phoneNumber: '',
          username: '',
          realName: ''
        }
      }
    }
  },
  methods: {
    submit() {
      console.log(this.user)

      updateUserInfo(this.user).then(response => {
        console.log(response)
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })

        // this.$store.dispatch('user/logout')
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
