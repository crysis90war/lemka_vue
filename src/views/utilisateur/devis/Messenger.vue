<template>
  <div class="border-0 shadow p-2 bg-white rounded">
    <section class="border-0 shadow p-3 bg-white rounded my-4 overflow-auto" style="height: 500px">
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3">Hello! How can I help you?</b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">I want to buy a hamburger</b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3">We are really sorry, we don't sell hamburgers.</b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3">But we can suggest you to go to McDonalds.</b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">No thanks. McDonalds is not Halal.</b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">Anyway... What would be the best price ?</b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3">The price is shown on the left.</b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3 text-wrap">
          If the price suits you, you can accept it or refuse it. You also have time
          for reflection but after a week, it will no longer be.
        </b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">Ok, Thanks you!</b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">I will see with my wife.</b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">And give you the answer tomorrow before midday</b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3 text-wrap">
          Feel free to ask any other question. Have a nice day!
        </b-badge>
      </div>
      <div class="d-flex flex-row">
        <b-badge variant="secondary" class="p-2 my-1 mr-3 text-wrap">
          Bye!
        </b-badge>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-badge variant="primary" class="p-2 my-1 ml-3">Thanks, you to. Bye!</b-badge>
      </div>
    </section>

    <b-input-group class="mt-3">
      <b-input type="text"></b-input>
      <b-input-group-append>
        <b-button variant="outline-primary">Envoyer</b-button>
      </b-input-group-append>
    </b-input-group>

  </div>
</template>
<script>
export default {
  name: 'Messenger'
}
</script>
