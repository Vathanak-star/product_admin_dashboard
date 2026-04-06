import { MapPin,RefreshCw,Trash } from "lucide-react";
import { useEffect, useState } from "react";
import locationService from "../../services/locations"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Location(){
    const [address,setAddress] = useState('')
    const [googleMap,setGoogleMap] = useState('')
    const [telegram,setTelegram] = useState('')
    const [image,setImage] = useState('')
    const [locationId, setLocationId] = useState(0)

    const [address1,setAddress1] = useState('')
    const [googleMap1,setGoogleMap1] = useState('')
    const [telegram1,setTelegram1] = useState('')
    const [image1,setImage1] = useState('')

    const [open,setOpen] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [openLocation,setOPenLocation] = useState(false);
    const [locations,setLocations] = useState([])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClose2 = () => setOpen2(false)

    const handleLocationClose = () => setOPenLocation(false)

    useEffect(() => {
      locationService.getAll().then(locations => {
        setLocations(locations.data)
        console.log(locations.data)
      })
    }, [])

    const handleDeleteLocation = (id) => {
      console.log(`location id: ${id}`)
      locationService.deleteLocation(id).then(result => {
        console.log(result)
        const locationIndex = locations.findIndex(obj => obj.id == id)
        const newData = [...locations]
        newData.splice(locationIndex,1)
        setLocations(newData)
        console.log('Delete Success')
        setOPenLocation(false)
        toast.success('Delete Location Success!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
      }).catch(error => {
        console.log(error)
      })
    }

    const handleUpdateLocation = (locationObj,id) => {
      console.log(`location id update: ${id}`)
      locationService.updateLocation(locationObj,id).then(result => {
        const location = locations.find(location => location.id == id)
        const newLocation = {...location,address: locationObj.address,googleMap:locationObj.googleMap,telegram: locationObj.telegram,image: locationObj.image}
        const locationIndex = locations.findIndex(obj => obj.id == id)
        const newData = [...locations]
        newData[locationIndex] = newLocation
        setLocations(newData)

        setAddress1('')
        setTelegram1('')
        setGoogleMap1('')
        setImage1('')
        setOpen2(false)
        toast.success('Update Location Success!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
      }).catch(error => {
        console.log(error)
      })
    }

    const columns = [
      { field: 'id', headerName: 'ID', width: 30},
      {
        field: 'address',
        headerName: 'Address',
        flex: 1
      },
      {
        field: 'googleMap',
        headerName: 'Google Map',
        flex: 1
      },
      {
        field: 'telegram',
        headerName: 'Telegram',
        flex: 1
      },
      {
        field: 'image',
        headerName: 'Image',
        sortable: false,
        flex: 1
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} variant="contained" onClick={() => {
            setOpen2(true)
            setLocationId(params.id)
            setAddress1(params.row.address)
            setGoogleMap1(params.row.googleMap)
            setTelegram1(params.row.telegram)
            setImage1(params.row.image)
          }}>
            <RefreshCw className="w-5 h-5"/>
          </Button>
        ),
        width: 90
      },
      {
        field: 'delete',
        headerName: 'Delete',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={() => {
            console.log('Row ID: ',params.row.image)
            setLocationId(params.id)
            setOPenLocation(true)
          }}>
            <Trash/>
          </Button>
        ),
        width: 90
      },
    ];

    const onAddNewLocation = () => {
      const locationObj = {
        address: address,
        telegram: telegram,
        googleMap: googleMap,
        image: image
      }

      locationService.addLocation(locationObj).then(location => {
        console.log(`Data: ${JSON.stringify(location.data)}`)
        console.log(typeof locations, locations)
        setLocations([...locations,location.data])
        toast.success('Add Location Success!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
          });
      }).catch(error => {
        console.log(error.message)
      })

      setAddress('')
      setTelegram('')
      setGoogleMap('')
      setImage('')
    }

  

    return (
        <div className="flex flex-col h-screen bg-gray-100">
          <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                      />
            {/* appbar */}
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <MapPin className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg"> Manage Location</h1>
            </div>

            <div className="flex justify-end pt-4 pl-4 pr-5">
              <button onClick={handleOpen} className="bg-indigo-500 rounded-lg px-4 py-2 text-white shadow text-sm hover:bg-indigo-600 border border-indigo-500">Add Location</button>
            </div>

            <div className="p-4">
                <Box sx={{ height: 700, width: '100%'}}>
                    <DataGrid
                        rows={locations}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 12,
                            },
                        },
                        }}
                        pageSizeOptions={[12]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
            <Dialog open={openLocation}>
              <DialogTitle>Do you want to delete this id {locationId}?</DialogTitle>
              <DialogActions>
                  <Button onClick={() => handleDeleteLocation(locationId)} color="success">Yes</Button>
                  <Button onClick={handleLocationClose} color="error">No</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} fullWidth aria-labelledby="dialog-title">
                <DialogTitle marginLeft={3}>Add New Location</DialogTitle>
                <DialogContent>
                  <Stack spacing={3} marginX={2} marginY={1}>
                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} variant="outlined" label='Address'></TextField>
                    <TextField value={googleMap} onChange={(e) => setGoogleMap(e.target.value)} variant="outlined" label='Google Map'></TextField>
                    <TextField value={telegram} onChange={(e) => setTelegram(e.target.value)} variant="outlined" label='Telegram Link'></TextField>
                    <TextField value={image} onChange={(e) => setImage(e.target.value)} variant="outlined" label='Image Url'></TextField>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onAddNewLocation} color="success">Submit</Button>
                  <Button onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={open2} fullWidth aria-labelledby="dialog-title">
                <DialogTitle marginLeft={3}>Update Location</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>Are you sure you want to join</DialogContentText> */}
                  <Stack spacing={3} marginX={2} marginY={1}>
                    <TextField value={address1} onChange={(e) => setAddress1(e.target.value)} variant="outlined" label='Address'></TextField>
                    <TextField value={googleMap1} onChange={(e) => setGoogleMap1(e.target.value)} variant="outlined" label='Google Map'></TextField>
                    <TextField value={telegram1} onChange={(e) => setTelegram1(e.target.value)} variant="outlined" label='Telegram Link'></TextField>
                    <TextField value={image1} onChange={(e) => setImage1(e.target.value)} variant="outlined" label='Image Url'></TextField>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleUpdateLocation({
                    address: address1,
                    googleMap: googleMap1,
                    telegram: telegram1,
                    image: image1
                  },locationId)} color="success">Submit</Button>
                  <Button onClick={handleClose2} color="error">Cancel</Button>
                </DialogActions>
              </Dialog>
        </div>
    )
}