<template>
  <div class="login">
    <ValidationObserver ref="form" tag="form" @submit.prevent="submitForm">
      <p class="subtitle">Sign in</p>

      <app-input v-model="form.email" rules="email|required" name="Email" type="text">Email</app-input>
      <app-input v-model="form.password" rules="min:6|required" name="Password" type="password">Password</app-input>
      <div class="error form-error">{{ errorMessage }}</div>

      <!--   TODO: add forgot password -->
      <!--      <p @click="openSignUp" class="recover-password">Forgot password?</p>-->
      <button class="btn-pink" type="submit">Log In</button>
    </ValidationObserver>

    <div class="hint">
      Don’t have an account?
      <p @click="openSignUp">Register here</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '@/_shared/utils/http';
import { AuthService } from '@/auth/auth-service';

@Component({})
export default class Login extends Vue {
  public $refs!: {
    form: HTMLFormElement;
  };

  public $router: any;

  public $route: any;

  public form: any = {
    email: '',
    password: '',
  };

  public errorMessage = '';

  public openSignUp() {
    this.$router.push('/sign-up');
  }

  public async submitForm() {
    const isValid = await this.$refs.form.validate();
    if (isValid) {
      http
        .post('/accounts/sign-in', this.form)
        .then((res: any) => {
          AuthService.saveUser(res);
          this.$router.push('/vendors');
        })
        .catch((msg: string) => {
          this.errorMessage = msg;
        });
    }
  }
}
</script>

<style lang="sass" scoped>

.login
  max-width: 400px
  margin: 60px auto

.subtitle
  width: 100px
  margin: 0 auto
  // margin-left: 160px

.hint
  line-height: 150%
  font-size: 16px
  font-weight: 300
  text-align: center
  margin-top: 40px
  p
    font-weight: 600
    cursor: pointer

.recover-password
  font-size: 14px
  font-weight: 600
  color: $pink
  text-align: right
  margin-bottom: 40px

.btn-pink
  display: block
  width: 100%
  margin-bottom: 20px

.form-error
  margin-bottom: 20px
</style>
