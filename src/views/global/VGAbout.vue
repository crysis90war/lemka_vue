<template>
  <div class="about">
    <b-container>
      <div class="text-center my-5">
        <h1>À propos de nous</h1>
      </div>
      <div class="text-justify my-5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut odio sagittis, posuere diam eget, scelerisque lectus. Sed a
          metus
          viverra justo ultricies maximus ut eu dolor. Nam sollicitudin dui risus, vitae pharetra leo sagittis sit amet. Cras feugiat arcu
          ac
          felis dignissim lobortis. Curabitur blandit justo eget erat interdum consectetur. Vestibulum vel molestie elit, eget feugiat urna.
          Mauris molestie purus nec eros finibus consequat.
        </p>

        <p>
          Cras nec lectus a risus lacinia scelerisque vel eget velit. Cras suscipit, nibh vitae consectetur ultrices, elit quam ornare
          tellus,
          pulvinar varius nulla velit at sem. Duis diam velit, finibus quis tincidunt at, ultricies vitae ipsum. Donec eget placerat mi, at
          condimentum ipsum. Phasellus mollis a lacus vitae consectetur. Etiam et congue metus, vel euismod orci. Sed ut lectus eu lectus
          placerat laoreet. Cras non quam vestibulum, auctor arcu tincidunt, maximus erat. Nam efficitur dictum dolor vitae luctus.
          Pellentesque bibendum enim justo, a finibus mauris tincidunt eget. Donec id augue nec neque fermentum euismod. Praesent tellus
          nibh,
          laoreet nec sapien et, finibus pretium massa. Aenean odio dui, sodales id mauris sit amet, luctus lobortis turpis. Cras nisi ante,
          fermentum a maximus non, ultrices vel ligula. Vestibulum laoreet cursus enim, ac sagittis eros vestibulum in. Praesent quis ornare
          orci.
        </p>

        <p>
          Aliquam pharetra massa sit amet lacus semper, ut imperdiet nunc ultrices. Ut sed commodo mi. Aliquam ex odio, fringilla quis dolor
          a, auctor aliquet velit. Suspendisse id lacus id augue convallis tincidunt auctor at est. Aliquam accumsan augue vel purus
          consectetur, sed commodo lorem eleifend. Nulla congue ex felis, in aliquet lacus ullamcorper vel. Cras dapibus imperdiet lorem.
          Pellentesque feugiat molestie blandit. Nam suscipit velit magna. Curabitur dolor ipsum, accumsan id mauris eget, lacinia pulvinar
          diam. Mauris sit amet augue non ipsum tempor aliquet.
        </p>
      </div>
    </b-container>
  </div>
</template>

<script>
import {htmlTitle} from "@/utils/tools";

export default {
  name: 'VGAbout',
  title() {
    return htmlTitle('À propos')
  },
  data() {
    return {}
  },
  methods: {},
}
</script>