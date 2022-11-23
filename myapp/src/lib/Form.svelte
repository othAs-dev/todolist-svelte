<script>
  	import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import {dataGetting } from '../data/Data';
    import  axios from 'axios'
    let todoItems = [];
    let inputValue = '';
    let checkBoxValueDone = false;
    onMount( async () => {
      todoItems = await dataGetting();
    })


  const addToDo = async () => (
     inputValue === '' ? alert('enter correct value') : await axios.post("http://localhost:3030/create",
    {   
      name: inputValue,
      status: checkBoxValueDone
    }).then(async ()=>{
      todoItems = await dataGetting(),
      inputValue = ''
    }) 
  )

  const removeToDo = (id) => {
    axios.delete(`http://localhost:3030/delete/${id}`).then( async () => {
      todoItems = await dataGetting();
    })

  }
  const updateStatus = async (id, statusId) => {
    axios.put(`http://localhost:3030/todos/${id}`, {
      status: Number(statusId),
    }).then(async ()=> {
      todoItems = await dataGetting();
    })
  }
</script>

  <div class='container'>
    <form>
      <label for="x">Add a task</label>
      <input type="text" placeholder="Here" title="type here your task" bind:value={inputValue}>
      <div class="checking">
        <div class="done">
          <label for="x" class="labDone">Done</label>
          <input bind:checked={checkBoxValueDone} type="checkbox" >
        </div>
      </div>
      <button on:click|preventDefault={addToDo} id='btn'>Add</button>
    </form>
    <div class="todoList">
      {#each todoItems as item}
        <div class="todoItem">
          <input  bind:checked={item.status} on:click={() => updateStatus(item.id, Number(!item.status))} type="checkbox" title={item.status === 1 ? `Uncheck task ${item.name}`: `Check task ${item.name}`} transition:fade>
          <span  class:checked={item.status}  class="items" transition:fade>{item.name}</span>
          <span on:click={() => removeToDo(item.id)} title="Delete task {item.name}" class='fa fa-trash' transition:fade></span>
        </div>
      {/each} 
    </div>
  </div>
<style>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  label{
    margin-left: -235px;
    font-size: 25px;
  }
  input[type=text]{
    background-color: #242424;
    width: 350px;
    height: 80px;
    border: none;
    border-bottom: 1px solid #fff;
    font-size: 25px;
    color: #fff;
    padding-left: 10px;
  }
  input:focus {
        outline:none;
        border-bottom: 1px solid rgb(244, 195, 21);
  }
  #btn{
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    width: 140px;
    height: 45px;
    font-size: 18px;
    margin: 30px 0 0 220px;
  }
  #btn:hover{
   background-color: rgb(244, 195, 21);
  }
  .todoList{
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    margin-left: -80px;
    margin-top: 50px;
  }
  .todoItem{
    margin-left: -45px;
  }
  .checked {
        text-decoration: line-through;
  }
  input[type=checkbox]{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .fa-trash{
    margin-left: 20px;
    color: rgb(244, 195, 21);
  }
  .checking{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
  .done{
    width: 180px;
    display: flex;
    flex-direction: column;
    margin-left: -150px;
  }
  .labDone{
    margin-left: -15px;
    margin-bottom: 8px;
  }
</style>
