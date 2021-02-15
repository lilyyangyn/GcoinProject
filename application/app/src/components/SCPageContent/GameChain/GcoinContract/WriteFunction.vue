<template>
  <Collapse accordion simple>
    <Panel name="approveFunction">
      Approve
      <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="transferFunction">
      Transfer
      <div slot="content">
        <label>address_to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="transferFromFunction">
      Transfer_From
      <div slot="content">
        <label>address_from</label>
        <input type="text"></input>
        <label>address_to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
export default {
  name: "WriteFunction"
}
</script>

<style scoped>
label {
  margin-right: 2%;
  font-weight: initial;
}

input {
  margin-right: 4%;
}
</style>