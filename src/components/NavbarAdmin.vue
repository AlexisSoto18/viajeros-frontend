<template>
    <div>
        <!-- Sidebar -->
        <aside class="w-64 text-black p-4 fixed h-full">
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-2xl font-bold text-gray-800">👤 Panel Admin</h1>
                <button @click="toggleMobileMenu" class="md:hidden text-gray-600">
                    ✖
                </button>
            </div>
            <button @click="goToPueblos" class="w-2/3  text-left px-4 py-2 rounded-lg font-medium text-gray-700 
                 hover:bg-red-100 hover:text-red-600 transition-colors">
                🏕️ Pueblos
            </button>
            <button @click="goToAdminPueblos" class="w-2/3  text-left px-4 py-2 rounded-lg font-medium text-gray-700 
                 hover:bg-red-100 hover:text-red-600 transition-colors">
                🛠️ Admin Panel
            </button>
        </aside>

        <!-- Contenido dinámico -->
        <main class="ml-64 p-6 flex-1 overflow-y-auto">
        </main>
    </div>
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
            router.push('/admin/pueblos');
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
