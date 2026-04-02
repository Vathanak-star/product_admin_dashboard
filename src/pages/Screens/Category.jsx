import { Layers, RefreshCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import categoryService from '../../services/categories'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";



export default function Category(){
    const [categories,setCategoires] = useState([])
    const [subCategories,setSubCategories] = useState([])

    const [nameMain,setNameMain] = useState('')

    const [nameSub,setNameSub] = useState('')
    const [mainCategoryId, setMainCategoryId] = useState(0)
    const [mainId, setMainId] = useState(0)
    const [subId,setSubId]= useState(0)

    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)

    const handleClose = () => setOpen(false)
    const [mainCat,setMainCat] = useState('')

    const [selectValue,setSelectValue] = useState(0)
    const handleClose2 = () => setOpen2(false)
    const [subCat,setSubCat] = useState('')

    useEffect(() => {
      categoryService.getAllCategories().then(categories => {
        setCategoires(categories.data)
      })

      categoryService.getSubCategories().then(subCat => {
        setSubCategories(subCat.data)
      })
    },[])

    const handleUpdateMainCategory = async (mainCatObj,id) => {
      try {
        const result = await categoryService.updateMainCategory(mainCatObj,id)
        console.log(result)
        const mainCategory = categories.find(mainCat => mainCat.id == id)
        const newMainCat = {...mainCategory,name: mainCatObj.name}
        const mainCatIndex = categories.findIndex(item => item.id == id)
        const newData = [...categories]
        newData[mainCatIndex] = newMainCat
        setCategoires(newData)

        setMainCat('')
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    }

    const handleUpdateSubCategory = async (subCatObj,id) => {
      try {
        const result = await categoryService.updateSubCategory(subCatObj,id)
        console.log(result)
        const subCategory = subCategories.find(subCat => subCat.id == id)
        const newSubCat = {...subCategory,name: subCatObj.name,mainCategoryId: subCatObj.mainCategoryId}
        const subCatIndex = subCategories.findIndex(item => item.id == id)
        const newData = [...subCategories]
        newData[subCatIndex] = newSubCat
        setSubCategories(newData)

        setSubCat('')
        setOpen2(false)
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeleteMainCategory = async (id) => {
      try {
        const result = await categoryService.deleteMainCategory(id)
        console.log(result)
        setCategoires(cate => cate.filter(item => item.id !== id))
        setSubCategories(subCat => subCat.filter(item => item.mainCategoryId !== id))
        console.log('Main Category Delete Finish')
      } catch (error) {
        console.log(error.message)
      }
    }

    const handleDeleteSubCategory = async (id) => {
      try {
        const result = await categoryService.deleteSubCategory(id)
        console.log(result)
        setSubCategories(subCat => subCat.filter(item => item.id !== id))
        console.log(subCategories)
      } catch (error) {
        console.log(error.message)
      }
    }

    const columns = [
      { field: 'id', headerName: 'ID', flex:1},
      {
        field: 'name',
        headerName: 'name',
        flex: 1
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} variant="contained" onClick={() => {
            setMainId(params.id)
            setMainCat(params.row.name)
            setOpen(true)
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
          <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={() => {
            console.log('Row ID: ',params.id)
            handleDeleteMainCategory(params.id)
          }}>
            <Trash/>
          </Button>
        ),
        width: 90
      },
    ];

    const columSub = [
      { field: 'id', headerName: 'ID', flex: 1},
      {
        field: 'name',
        headerName: 'name',
        flex: 1
      },
      {
        field: 'mainCategoryId',
        headerName: 'Main Category ID',
        flex: 1
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} variant="contained" onClick={() => {
            setSubId(params.id)
            setSelectValue(params.row.mainCategoryId)
            setSubCat(params.row.name)
            setOpen2(true)
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
          <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={() => {
            console.log('Row ID: ',params.id)
            handleDeleteSubCategory(params.id)
          }}>
            <Trash/>
          </Button>
        ),
        width: 90
      },
    ];

    const handleMainCatAdd = async (event) => {
      event.preventDefault()
      const mainCatObj = {
        name: nameMain
      }

      try {
        const result = await categoryService.addMainCategory(mainCatObj)
        console.log(result.data)
        setCategoires([...categories,result.data])
        setNameMain('')
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubCatAdd = async (event) => {
      event.preventDefault()
      const subCatObj = {
        name: nameSub,
        mainCategoryId: mainCategoryId
      }

      try {
        const result = await categoryService.addSubCategory(subCatObj)
        console.log(result.data)
        setSubCategories([...subCategories,result.data])
        setNameSub('')
      } catch (error) {
        console.log(error)
      }
    }


    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <Layers className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg"> Manage Categories</h1>
            </div>

            <div className="flex">
                <div className="flex flex-col flex-1 p-4">
                    <h1 className="flex w-full justify-center text-lg font-semibold">Main Category</h1>
                    <h2 className="mt-3 ml-0">Add new Main Category:</h2>
                    <form className="mt-4" onSubmit={handleMainCatAdd}>
                        <div className="mb-3">
                            <label htmlFor="mainCategory" className="block mb-2.5 text-sm font-medium text-heading">Main Category</label>
                            <input value={nameMain} onChange={({target}) => setNameMain(target.value)} type="text" id="mainCategory" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter main category" required />
                        </div> 
                        <button type="submit" className="bg-indigo-500 px-4 py-1 text-white rounded-md shadow">Add New</button>
                    </form>

                    <div className="p-0 mt-24">
                        <Box sx={{ height: 540, width: '100%'}}>
                            <DataGrid
                                rows={categories}
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
                </div>
                <div className="flex flex-col flex-1 p-4">
                    <h1 className="flex w-full justify-center text-lg font-semibold">Sub Category</h1>
                    <h2 className="mt-3 ml-0">Add new Sub Category:</h2>
                    <form className="mt-4" onSubmit={handleSubCatAdd}>
                        <div className="mb-3">
                            <label htmlFor="subCategory" className="block mb-2.5 text-sm font-medium text-heading">Sub Category</label>
                            <input type="text" id="subCategory" value={nameSub} onChange={({target}) => setNameSub(target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter sub category" required />
                        </div> 

                        <label htmlFor="mainCategory" className="block mb-2.5 text-sm font-medium text-heading">Select main category</label>
                        <select id="mainCategory" onChange={e => setMainCategoryId(Number(e.target.value))} className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                            <option selected>Choose a main category</option>
                        
                            {categories.map(category => 
                              <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>

                        <button type="submit" className="mt-3 bg-indigo-500 px-4 py-1 text-white rounded-md shadow">Add New</button>
                    </form>

                    <div className="p-0 mt-3">
                        <Box sx={{ height: 540, width: '100%'}}>
                            <DataGrid
                                rows={subCategories}
                                columns={columSub}
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
                </div>
            </div>

            <Dialog open={open} fullWidth>
              <DialogTitle>Update Main Category</DialogTitle>
              <DialogContent>
                <Stack>
                  <TextField value={mainCat} onChange={(e) => setMainCat(e.target.value)} placeholder="Main Category" ></TextField>
                </Stack>
              </DialogContent>

              <DialogActions>
                  <Button onClick={() => handleUpdateMainCategory({
                    name: mainCat
                  },mainId)} color="success">Submit</Button>
                  <Button onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open2} fullWidth>
              <DialogTitle>Update Main Category</DialogTitle>
              <DialogContent>
                <Stack>
                  <TextField value={subCat} onChange={(e) => setSubCat(e.target.value)} placeholder="Main Category" ></TextField>
                </Stack>

                <select value={selectValue} id="mainCategory" onChange={e => setSelectValue(Number(e.target.value))} className="block mt-3 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                            <option selected>Choose a main category</option>
                        
                            {categories.map(category => 
                              <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                </select>
              </DialogContent>

              <DialogActions>
                  <Button onClick={() => handleUpdateSubCategory({
                    name: subCat,
                    mainCategoryId: selectValue
                  },subId)} color="success">Submit</Button>
                  <Button onClick={handleClose2} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}