<template>
    <form @submit.prevent="handleSubmit">
        <label>Nome:</label>
        <input v-model="nome" type="text" required />

        <label>Email:</label>
        <input v-model="email" type="email" required />

        <label>Senha:</label>
        <input v-model="senha" type="password" required />

        <button type="submit">Cadastrar</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.$http.post('http://localhost:3001/cadastro', {
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                });
                alert('Cadastro realizado com sucesso!');
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
            }
        },
    },
};
</script>