<template>
  <div :class="id">
    <div class="card">
      <div class="card-high">
        <img :src="url" />
      </div>
      <div class="card-low">
        <h1>{{ nom }}</h1>
        <h3>{{poste}}</h3>
       <div>
          <p>Adresse </p>
           <b> {{email}} </b>
       </div>
       <div>
          <p>Tel </p>
           <b> {{numero}} </b>
       </div>
       <div>
          <p>Linkedink </p>
           <b> {{link}} </b>
       </div>
         
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsCard',
  props: ["nom","url", "email", "poste", "numero", "link"],
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
@media (min-width: 700px) {
  .card {
    margin: 20px;
    box-shadow: 0px 5px 10px #ccc;
    background-color: white;
    display: grid;
    grid-template-columns:  1fr;
  }
}
@media (max-width: 699px) {
  .card {
    margin: 20px;
    box-shadow: 0px 5px 10px #ccc;
    display: grid;
    grid-template-columns: 1fr;
  }
}
.card-high img {
  width: 70%;
  margin: auto;
  height: 80%;
  max-height: 300px;
  border-radius: 70%;
}
.card-low {
  text-align: center;
  position: relative;
  margin: 20px;
  display: grid;
}
.infos p {
  display: flex;
}
a {
  color: var(--first-color);
  text-decoration: none;
  font-weight: bold;
  
  display: inline-block;
  padding: 15px 20px;
  position: relative;
}
a:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: var(--first-color);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
a:hover:after { 
  width: 100%; 
  left: 0; 
}

p{
  float: left;
}

b{
  float: right;
}
</style>