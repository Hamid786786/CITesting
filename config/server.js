const jsonServer = require('json-server')
const server     = jsonServer.create()
const path       = require('path');
const dirname    = __dirname + '/db-files/';

// 1. include your json file
const auth               = require(path.join(dirname, 'auth.json'))
const dashboardRes       = require(path.join(dirname, 'dashboardRes.json'))
const appPalette         = require(path.join(dirname, 'appPalette.json'))
const tenantPalette      = require(path.join(dirname, 'tenantPalette.json'))
const globalRes          = require(path.join(dirname, 'globalRes.json'))
const loginRes           = require(path.join(dirname, 'loginRes.json'))
const loggedInRes        = require(path.join(dirname, 'loggedInRes.json'))
const forgotPass         = require(path.join(dirname, 'forgotPass.json'))
const inboxSearch        = require(path.join(dirname, 'inboxSearch.json'))
const communicationInbox = require(path.join(dirname, 'communicationInbox.json'))
const appointments       = require(path.join(dirname, 'appointments.json'))

const inboxMailApprove    = require(path.join(dirname, 'inboxMailApprove.json'))
const inboxMailDecline    = require(path.join(dirname, 'inboxMailDecline.json'))
const getInboxFilters     = require(path.join(dirname, 'getInboxFilters.json'))
const getGlobalCreateData = require(path.join(dirname, 'getGlobalCreateData.json'))
const equipmentCreateData = require(path.join(dirname, 'equipmentCreateData.json'))
const equipmentMetadata   = require(path.join(dirname, 'equipmentMetadata.json'))
const equipmentList       = require(path.join(dirname, 'equipmentList.json'))
const EquipmentSearch     = require(path.join(dirname, 'EquipmentSearch.json'))
const equipmentsMap       = require(path.join(dirname, 'equipmentsMap.json'))
const equipmentGraph      = require(path.join(dirname, 'equipmentGraph.json'))
const equipmentFilters    = require(path.join(dirname, 'equipmentFilters.json'))
const equipmentMetadata2  = require(path.join(dirname, 'equipmentMetadata2.json'))
const equipmentList2      = require(path.join(dirname, 'equipmentList2.json'))
const listContacts        = require(path.join(dirname, 'listContacts.json'))
const getModule        = require(path.join(dirname, 'getModule.json'))
const getStartedStatusForUser   = require(path.join(dirname, 'getStartedStatusForUser.json'))

//2. pass the variable as param in the below line
var result                = Object.assign({}, auth, dashboardRes, appPalette,
    tenantPalette,
    globalRes,
    loginRes,
    loggedInRes,
    forgotPass,
    inboxSearch,
    communicationInbox,
    appointments,
    inboxMailApprove,
    inboxMailDecline,
    getInboxFilters,
    getGlobalCreateData,
    equipmentCreateData,
    equipmentMetadata,
    equipmentList,
    EquipmentSearch,
    equipmentsMap,
    equipmentGraph,
    equipmentFilters,
    equipmentMetadata2,
    equipmentList2,
    listContacts,
    getModule,
    getStartedStatusForUser);

const router      = jsonServer.router(result)
const middlewares = jsonServer.defaults()
server.use(middlewares)
//server.use(router)
server.use('/api', router);

server.listen(3004, () => {
    console.log('JSON Server is running')
})


