<template lang="" >
  <div  class="sep">
      <!-- component -->
    <!-- MDI Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
    >

    <!-- Page Container -->
    <template v-for="todo in this.todos" :key="todo.nom">
        <contactsCard  
                :nom="todo.nom" 
                :url="todo.url" 
                :email="todo.email"
                :poste="todo.poste"
                :link="todo.link"
                :numero="todo.numero"> 
  </contactsCard>
    </template>
  </div>
</template>
<script>
import ContactsCard from "@/components/Card/ContactsCard.vue";
import img from "@/assets/img/landing/girl_1.jpg";

export default {
  name: "GuideContacts",
  components: {
    ContactsCard,
  },
  data() {
    return {
      todos: [
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
        {
          nom: "lewis",
          url: img,
          nom: "jin",
          email: "jin@gmail.com",
          poste: "ifhsj",
          numero: '0745316454',
          link: "jdnsjcs",
        },
      ],
    };
  },
};
</script>
<style lang="css" scoper>
.sep{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
