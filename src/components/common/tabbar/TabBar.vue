<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: "TabBar"
};
</script>
<style>
ul li {
  list-style-type: none;
}

#tab-bar {
  display: flex;
  height: 49px;
  width: 100%;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
</style>
