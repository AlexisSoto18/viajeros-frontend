<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 sm:px-8">
      <!-- Logo y nombre -->
      <div class="flex items-center gap-3">
        <img src="@/assets/logoStil.png" alt="Viajeros" class="h-9 w-9" />
        <RouterLink to="/Home" class="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Viajeros
        </RouterLink>
      </div>

      <!-- Navegación -->
      <nav class="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-700">
        <template v-if="!userStore.isAuthenticated">
          <div class="flex items-center gap-4" @click="goToLogin">
            <img src="@/assets/acceder.png" alt="Logo" class="h-9 w-9" />
            <span class="hover:text-blue-600 transition-colors">Iniciar sesión</span>
          </div>
          <div class="flex items-center gap-4 cursor-pointer" @click="goToRegister">
            <img src="@/assets/register.png" alt="Logo" class="h-9 w-9" />
            <span class="hover:text-blue-600 transition-colors">Registrarse</span>
          </div>
        </template>
        <template v-else>
          <button @click="logout" class="hover:text-red-600 transition-colors">Cerrar sesión</button>
          <img class="h-9 w-9 rounded-full border border-gray-300" src="https://i.pravatar.cc/150?img=12"
            alt="Avatar" />
        </template>
      </nav>
    </div>
  </header>
</template>
<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const logout = () => {
      userStore.logout();
      router.push('/Home');
    };

    const goToLogin = () => {
      router.push('/login');
    };

    const goToRegister = () => {
      router.push('/register');
    };

    return {
      userStore,
      logout,
      goToRegister,
      goToLogin
    };
  }
};
</script>
