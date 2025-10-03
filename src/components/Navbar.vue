<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo y nombre -->
      <div class="flex items-center gap-2 sm:gap-3">
        <img src="@/assets/logoStil.png" alt="Viajeros" class="h-8 w-8 sm:h-9 sm:w-9" />
        <RouterLink to="/Home"
          class="text-lg sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Viajeros
        </RouterLink>
      </div>

      <!-- Navegación Desktop -->
      <nav class="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-gray-700">
        <template v-if="!userStore.isAuthenticated">
          <div class="flex items-center gap-2 lg:gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            @click="goToLogin">
            <img src="@/assets/acceder.png" alt="Logo" class="h-8 w-8 lg:h-9 lg:w-9" />
            <span class="hover:text-blue-600 transition-colors">Iniciar sesión</span>
          </div>
          <div class="flex items-center gap-2 lg:gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            @click="goToRegister">
            <img src="@/assets/register.png" alt="Logo" class="h-8 w-8 lg:h-9 lg:w-9" />
            <span class="hover:text-blue-600 transition-colors">Registrarse</span>
          </div>
        </template>
        <template v-else>
          <button
            v-if="!userStore.isAdmin"
            @click="goToPueblos"
            class="hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            Pueblos
          </button>
          <button @click="logout" class="hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
            Cerrar sesión
          </button>
          <img class="h-8 w-8 lg:h-9 lg:w-9 rounded-full border border-gray-300" src="https://i.pravatar.cc/150?img=12"
            alt="Avatar" />
        </template>
      </nav>

      <!-- Botón menú móvil -->
      <button @click="toggleMobileMenu"
        class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Abrir menú">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Menú móvil -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <nav class="px-4 py-4 space-y-3">
        <template v-if="!userStore.isAuthenticated">
          <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            @click="goToLogin">
            <img src="@/assets/acceder.png" alt="Logo" class="h-8 w-8" />
            <span class="text-gray-700 font-medium">Iniciar sesión</span>
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            @click="goToRegister">
            <img src="@/assets/register.png" alt="Logo" class="h-8 w-8" />
            <span class="text-gray-700 font-medium">Registrarse</span>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center gap-3 p-3">
            <img class="h-8 w-8 rounded-full border border-gray-300" src="https://i.pravatar.cc/150?img=12"
              alt="Avatar" />
            <span class="text-gray-700 font-medium">Mi perfil</span>
          </div>
          <button @click="logout"
            class="w-full text-left p-3 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-colors">
            Cerrar sesión
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>
<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const showMobileMenu = ref(false);

    const logout = () => {
      userStore.logout();
      router.push('/Home');
      showMobileMenu.value = false; // Cerrar menú móvil después del logout
    };

    const goToLogin = () => {
      router.push('/login');
      showMobileMenu.value = false; // Cerrar menú móvil después de navegar
    };

    const goToRegister = () => {
      router.push('/register');
      showMobileMenu.value = false; // Cerrar menú móvil después de navegar
    };

    const goToPueblos = () => {
      router.push('/pueblos');
      showMobileMenu.value = false; // Cerrar menú móvil después de navegar
    };

    const goToAdminPueblos = () => {
      router.push('/admin/main');
      showMobileMenu.value = false; // Cerrar menú móvil después de navegar
    };

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    return {
      userStore,
      logout,
      goToRegister,
      goToLogin,
      goToPueblos,
      showMobileMenu,
      toggleMobileMenu,
      goToAdminPueblos
    };
  }
};
</script>
