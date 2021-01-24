<template>
  <Collapse simple>
    <Panel name="function1">
      Function 1
      <div slot="content">
        <label>input 1</label>
        <input type="text"></input>
        <label>input 2</label>
        <input type="text"></input>
        <Button type="success">Write</Button>
      </div>
    </Panel>
    <Panel name="function2">
      Function 2
      <div slot="content">
        <label>input 1</label>
        <input type="text"></input>
        <label>input 2</label>
        <input type="text"></input>
        <Button type="success">Write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
export default {
  name: "GcoinWriteFunction"
}
</script>

<style scoped>
  label {
    margin-right: 2%;
  }

  input {
    margin-right: 4%;
  }
</style>