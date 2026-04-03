import { ShoppingCart } from "lucide-react";
import React from "react";
import {RefreshCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import categoryService from '../../services/categories'
import itemsService from '../../services/items'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

const desc = "AMD Ryzen™ 9 9955HX NVIDIA® GeForce RTX™ 5070 16GB DDR5 1TB PCIe® 4.0 NVMe™ M.2 SSD FHD+ 165Hz Windows 11 Home"

export default function Product(){
    const [items, setItems] =useState([])
    const [openAdd,setOpenAdd] = useState(false)
    const [categories,setCategories] = useState([])
    const [selectValue,setSelectValue] = useState('')
    const [statusValue,setStatusValue] = useState('')
    const [catValue,setCatValue] = useState('')

    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState()
    const [image,setImage] = useState('')
    const [openUp,setOpenUp] = useState(false)
    const [updateId,setUpdateId] = useState(0)


    const [search,setSearch] = useState('')
    const [filterCat,setFilterCat] = useState('')

    const resetField = () => {
        setName('')
        setPrice()
        setDescription('')
        setImage('')
        setSelectValue('')
        setStatusValue('')
    }


    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => {
      setOpenAdd(false)
      resetField()
    }

    const handleOpenUP = () => setOpenUp(true)
    const handleCloseUp = () => {
      setOpenUp(false)
      resetField()
    }

    const handleSearchItem = () => {
      const tempItems = [...items]
      const searchItem = tempItems.filter((item) => item.name.toLowerCase().startsWith(search))
      console.log(searchItem)
      setItems(searchItem)
      
    }


    const handleDeleteItem = async (id) => {
      try {
        const result = await itemsService.deleteItem(id)
        console.log(result)
        setItems(item => item.filter(i => i.id !== id))
        console.log('Delete Item finish')
      } catch (error) {
        console.log(error.message)
      }
    }

    const handleUpdateItem = async () => {
      const ItemObj = {
        name: name,
        price: price,
        description: description,
        image: image,
        category: selectValue,
        status: statusValue
      }
      try {
        const result = await itemsService.updateItem(ItemObj,updateId)
        console.log(result)
        const item = items.find(item => item.id == updateId)
        const newItem = {item,
          id: updateId,
          name: name,
          price: price,
          description: description,
          image: image,
          category: selectValue,
          status: statusValue
        }
        const itemIndex = items.findIndex(item => item.id == updateId)
        const newData = [...items]
        newData[itemIndex] = newItem
        setItems(newData)
        setOpenUp(false)
        resetField()

      } catch (error) {
        console.log(error.message)
      }
    }

    const columns = [
      { field: 'id', headerName: 'ID', flex:1},
      {
        field: 'name',
        headerName: 'Name',
        flex: 1
      },
      {
        field: 'image',
        headerName: 'Image',
        flex: 1
      },
      {
        field: 'price',
        headerName: 'Price',
        flex: 1
      },
      {
        field: 'description',
        headerName: 'Description',
        flex: 1
      },
      {
        field: 'category',
        headerName: 'Category',
        flex: 1
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} variant="contained" onClick={() => {
            setUpdateId(params.id)
            setName(params.row.name)
            setPrice(params.row.price)
            setDescription(params.row.description)
            setImage(params.row.image)
            setSelectValue(params.row.category)
            setStatusValue(params.row.status)
            setOpenUp(true)
          }}>
            <RefreshCcw className="w-5 h-5"/>
          </Button>
        ),
        width: 90
      },
      {
        field: 'delete',
        headerName: 'Delete',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={ () => {
            handleDeleteItem(params.id)
          }
          }>
            <Trash/>
          </Button>
        ),
        width: 90
      },
    ];

    useEffect(() => {
      categoryService.getSubCategories().then(subCategories => {
        console.log(subCategories.data)
        setCategories(subCategories.data)
      })
    },[])

    useEffect(() => {
      itemsService.getAllItem().then(items => {
        console.log(items.data)
        setItems(items.data)
      })
    },[])

    const onAddNewItem = () => {
      const ItemObj = {
        name: name,
        price: price,
        description: description,
        image: image,
        category: selectValue,
        status: statusValue
      }

      itemsService.createItem(ItemObj).then(item => {
        console.log(item.data)
        console.log('item added successfully')
        setItems([...items,item.data])

        setOpenAdd(false)
        resetField()
      }).catch(error => {
        console.log(error.message)
      })
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <ShoppingCart className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg"> Manage Products</h1>
            </div>

            <div className="p-6">
                <div className="flex w-full items-center justify-between">
                    <div className="flex">
                        <div className="relative flex items-center w-60 lg:w-80 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                        
                            <input
                                value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-l-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search Products..." 
                            />
                            
                            <button
                            className="rounded-r-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-0"
                            type="button"
                            onClick={handleSearchItem}
                            >
                            Search
                            </button> 
                        </div>

                        <div className="relative w-45 lg:w-70 transition-all ml-3">
                        <select
                                value={catValue} onChange={e => setCatValue(e.target.value)} class="w-full transition-all bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                <option selected>Filter By Category</option>
                                {categories.map(categories => {
                                  return <option key={categories.id} value={categories.name}>{categories.name}</option>
                                })}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <button onClick={handleOpenAdd} className="py-2 px-4 bg-indigo-400 text-white hover:bg-indigo-700 rounded-lg text-sm shadow-md hover:shadow-lg">Add Product</button>
                    </div>
                </div>
            </div>

            <div className="p-6 mt-0">
                <Box sx={{ height: 540, width: '100%'}}>
                    <DataGrid
                        rows={items}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 8,
                                },
                            },
                        }}
                        pageSizeOptions={[8]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>

            <Dialog open={openAdd} fullWidth>
                          <DialogTitle>Add New Product</DialogTitle>
                          <DialogContent>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" ></TextField>
                            <form className="w-full mx-auto my-3">
                              <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" className="block w-full px-3 py-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Price $: 99.99" required />
                            </form>
                            <Stack spacing={2}>
                              <TextField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" ></TextField>
                              <TextField value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" ></TextField>
                            </Stack>
            
                            <select value={selectValue} id="mainCategory" onChange={e => setSelectValue(e.target.value)} className="block mt-3 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                        <option selected>Choose a category</option>
                                    
                                        {categories.map(category => 
                                          <option key={category.id} value={category.name}>{category.name}</option>
                                        )}
                            </select>

                            <select value={statusValue} id="status" onChange={e => setStatusValue(e.target.value)} className="block mt-3 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                        <option selected>Select status</option>
                                        <option value="active">active</option>
                                        <option value="out of stock">out of stock</option>
                            </select>
                          </DialogContent>
            
                          <DialogActions>
                              <Button onClick={onAddNewItem} color="success">Submit</Button>
                              <Button onClick={handleCloseAdd} color="error">Cancel</Button>
                          </DialogActions>
            </Dialog>


            <Dialog open={openUp} fullWidth>
                          <DialogTitle>Update Product</DialogTitle>
                          <DialogContent>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" ></TextField>
                            <form className="w-full mx-auto my-3">
                              <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" className="block w-full px-3 py-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Price $: 99.99" required />
                          </form>
                            <Stack spacing={2}>
                              <TextField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" ></TextField>
                              <TextField value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" ></TextField>
                            </Stack>
                            
            
                            <select value={selectValue} id="mainCategory" onChange={e => setSelectValue(e.target.value)} className="block mt-3 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                        <option selected>Choose a category</option>
                                    
                                        {categories.map(category => 
                                          <option key={category.id} value={category.name}>{category.name}</option>
                                        )}
                            </select>

                            <select value={statusValue} id="status" onChange={e => setStatusValue(e.target.value)} className="block mt-3 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                        <option selected>Select status</option>
                                        <option value="active">active</option>
                                        <option value="out of stock">out of stock</option>
                            </select>
                          </DialogContent>
            
                          <DialogActions>
                              <Button onClick={handleUpdateItem} color="success">Submit</Button>
                              <Button onClick={handleCloseUp} color="error">Cancel</Button>
                          </DialogActions>
            </Dialog>
        </div>
    )
}