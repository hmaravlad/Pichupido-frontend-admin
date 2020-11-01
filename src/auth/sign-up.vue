<template>
  <div class="login">
    <div class="subtitle">Sign Up</div>

    <ValidationObserver @submit.prevent="submitForm" tag="form" ref="form">
      <div class="columns">
        <div class="column">
          <app-input class="is-marginless" v-model="form.firstName" rules="required" name="First Name">
            First Name
          </app-input>
        </div>
        <div class="column">
          <app-input class="is-marginless" v-model="form.lastName" rules="required" name="Last Name">
            Last Name
          </app-input>
        </div>
      </div>
      <app-input v-model="form.email" rules="email|required" name="Email">Email</app-input>

      <div class="columns">
        <div class="column">
          <app-input
            class="is-marginless"
            v-model="form.password"
            rules="required|min:6"
            type="password"
            name="Password"
            ref="password"
          >
            Password
          </app-input>
        </div>
        <div class="column">
          <app-input
            class="is-marginless"
            v-model="form.password2"
            rules="required|min:6|confirmed:Password"
            data-vv-as="password"
            type="password"
            name="Password confirmation"
          >
            Password Again
          </app-input>
        </div>
      </div>

      <div class="error">{{ errorMessage }}</div>
      <button class="btn-pink">Sign Up</button>
    </ValidationObserver>

    <div class="hint">
      Already have an account?
      <router-link to="sign-in" tag="p">Sign In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '@/_shared/utils/http';
import { AuthResponse, AuthService } from '@/auth/auth-service';
import Environment from '@/environment';

@Component({})
export default class Login extends Vue {
  public $refs!: {
    form: HTMLFormElement;
  };

  public $router: any;

  public $route: any;

  public form: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  };

  public errorMessage = '';

  public async submitForm() {
    const isValid = await this.$refs.form.validate();
    if (isValid) {
      http
        .post('/accounts/sign-up', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
          confirmPassword: this.form.password2,
          role: 'admin',
        })
        .then(() => {
          this.$router.push({ path: 'sign-in' });
        });
    }
  }
}
</script>

<style lang="sass" scoped>

.tos
  color: #6c8fc3
  margin-left: 5px

.login
  max-width: 560px
  margin: 60px auto

.subtitle
  margin-bottom: 40px

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
  margin-top: 40px
</style>
