function AddEditTimesheetController($scope, $http) {



    var vm = $scope;
    vm.isError = false;
    vm.errorMessage = '';
    vm.totalhours = {};
    vm.ProjectTeamMemberList = 'Project Team Members';
    vm.ProjectsList = 'Projects';
    vm.TimesheetList = 'Timesheet';
    vm.EmployeeTimesheetList = 'Employee Timesheet';
    vm.ProjectCategoryList = 'Project Category';
    vm.EmployeePersonalDetailsMasterList = 'Employee Personal Details Master';
    vm.FinancialYearMasterList = 'Financial Year Master';
    vm.HolidayList = 'Holiday';
    vm.LeaveRequestDetailsList = 'Leave Request Details';
    vm.LeaveRequestMaster = 'Leave Request Master';
    vm.PhasesList = 'Phases';
    vm.item = [];
    vm.HolidayTimesheetDiv = false;
    vm.TimesheetDivs = [];
    vm.MondayHoliday = null; vm.TuesdayHoliday = null; vm.WednesdayHoliday = null;
    vm.ThursdayHoliday = null; vm.FridayHoliday = null; vm.SaturdayHoliday = null; vm.SundayHoliday = null;
    // vm.ProjectManagerName = 'N/A';
    vm.RemoveIconToolTip = null;
    vm.TimesheetProject = 'Select'; vm.Timesheettask = 'Select';
    vm.BillableMondayhrs = 0; vm.NonBillableMondayhrs = 0;
    vm.MondayDescription = null; vm.NonBillableMondayDescription = null;
    vm.BillableTuesdayhrs = 0; vm.NonBillableTuesdayhrs = 0;
    vm.Tuesdaydescription = null; vm.NonBillableTuesdayDescription = null;
    vm.BillableWednesdayhrs = 0; vm.NonBillableWednesdayHrs = 0;
    vm.Wednesdaydescription = null; vm.NonBillablewednesdayDescription = null;
    vm.BillableThursdayhrs = 0; vm.NonBillableThursdayHrs = 0;
    vm.thursdaydescription = null; vm.NonBillablethursadayDesription = null;
    vm.BillableFridayhrs = 0; vm.NonBillableFridayHrs = 0;
    vm.FridayDescription = null; vm.NonBillableFridayDescription = null;
    vm.BillableSaturdayHrs = 0; vm.NonBillableSaturdayHrs = 0;
    vm.SaturdayDesription = null; vm.NonBillableSaturdayDesription = null;
    vm.BillableSundayHrs = 0; vm.NonBillableSundayHrs = 0;
    vm.SundayDescription = null; vm.NonBillableSundayDescription = null;
    vm.TimesheetStatus = 'New Timesheet'; vm.ProjectTimesheetStatus = '';
    vm.UserProject = [];
    vm.TimesheetDiv = true;
    vm.ProjectTitle = []; vm.Phases = [];
    vm.TotalhrsMonday = null; vm.TotalhrsTuesday = null; vm.TotalhrsWednesday = null; vm.TotalhrsThursday = null;
    vm.TotalhrsFriday = null; vm.TotalhrsSaturday = null; vm.TotalhrsSunday = null;
    // vm.MonHrs = null; vm.TueHrs = null; vm.WedHrs = null; vm.ThuHrs = null; vm.FriHrs = null;
    // vm.SatHrs = null; vm.SunHrs = null; vm.NBMonHrs = null; vm.NBTueHrs = null; vm.NBWedHrs = null;
    // vm.NBThuHrs = null; vm.NBFriHrs = null; vm.NBSatHrs = null; vm.NBSunHrs = null;
    vm.MonHrs = vm.BillableMondayhrs;
    vm.TueHrs = vm.BillableTuesdayhrs;
    vm.WedHrs = vm.BillableWednesdayhrs;
    vm.ThuHrs = vm.BillableThursdayhrs;
    vm.FriHrs = vm.BillableFridayhrs;
    vm.SatHrs = vm.BillableSaturdayHrs;
    vm.SunHrs = vm.BillableSundayHrs;
    vm.NBMonHrs = vm.NonBillableMondayhrs;
    vm.NBTueHrs = vm.NonBillableTuesdayhrs;
    vm.NBWedHrs = vm.NonBillableWednesdayHrs;
    vm.NBThuHrs = vm.NonBillableThursdayHrs;
    vm.NBFriHrs = vm.NonBillableFridayHrs;
    vm.NBSatHrs = vm.NonBillableSaturdayHrs;
    vm.NBSunHrs = vm.NonBillableSundayHrs;
    vm.TotalMondayhrs = null;
    vm.TotalTuesdayhrs = null;
    vm.TotalhrsWednesday = null;
    vm.TotalhrsThursday = null;
    vm.TotalhrsFriday = null;
    vm.TotalhrsTimesheet = null;
    /* ****************************************************************************************** */
    //get current week start date and end date
    vm.curr = new Date;
    vm.first = vm.curr.getDate() - vm.curr.getDay();
    vm.last = vm.first + 7;
    vm.firstday = new Date(vm.curr.setDate(vm.first + 1));
    vm.tue = new Date(vm.curr.setDate(vm.first + 2));
    vm.wed = new Date(vm.curr.setDate(vm.first + 3));
    vm.thu = new Date(vm.curr.setDate(vm.first + 4));
    vm.fri = new Date(vm.curr.setDate(vm.first + 5));
    vm.sat = new Date(vm.curr.setDate(vm.first + 6));
    vm.lastday = new Date(vm.curr.setDate(vm.last));
    vm.DateBox = vm.firstday.format('dd-MM-yyyy');
    /* ******************************************************************************* */
    // vm.MonHrs=0;
    // vm.TueHrs=0;
    // vm.WedHrs=0;
    // vm.ThuHrs=0;
    // vm.FriHrs=0;
    // vm.SatHrs=0;
    // vm.SunHrs=0;
    // vm.NBMonHrs=0;
    // vm.NBTueHrs=0;
    // vm.NBWedHrs=0;
    // vm.NBThuHrs=0;
    // vm.NBFriHrs=0;
    // vm.NBSatHrs=0;
    // vm.NBSunHrs=0;
    // vm.TotalHrs=0;
    /* ****************************************************************************************** */
    //get current logged in user
    vm.getCurrentLoggedInUser = function () {
        spcrud.getCurrentUser($http).then(function (UserResponse) {
            if (UserResponse.status === 200)
                vm.loggedInUserName = UserResponse.data.d.Title;
            vm.CurrentLoginName = UserResponse.data.d.LoginName;
            vm.initTotalHour();
            vm.readProjectTeamMembersLists();
            vm.readEmployeePersonalDetailsMasterList();
            vm.readSavedEmployeeTimesheetList();
        }, function (error) {
            console.log('error', error);
        });
    };
    vm.getCurrentLoggedInUser();
    /* ****************************************************************************************** */
    vm.readEmployeePersonalDetailsMasterList = function () {
        EmployeeSelect = 'Department/Department,*';
        EmployeeExpand = 'Department/Department';
        EmployeeFilter = 'Account_x0020_Holder_x0020_Name eq \'' + vm.loggedInUserName + '\'';
        vm.EmployeeProjectOptions = {
            select: EmployeeSelect,
            expand: EmployeeExpand,
            filter: EmployeeFilter
        };
        spcrud.read($http, vm.EmployeePersonalDetailsMasterList, vm.EmployeeProjectOptions).then(function (Employeeresponse) {
            if (Employeeresponse.status === 200)
                vm.LoggedInUserEmployeeId = Employeeresponse.data.d.results[0].Employee_x0020_ID;
            vm.readEmployeeLeaves();
            vm.EmployeeDepartment = Employeeresponse.data.d.results[0].Department.Department;
            vm.EmployeePersonalListId = Employeeresponse.data.d.results[0].EmployeeId;
        }, function (error) {
            console.log('error', error);
        });
    };
    /* ****************************************************************************************** */
    vm.readHolidayList = function () {
        var Fixed = "Fixed";
        var TodayDate = new Date();
        vm.Holiday = TodayDate.getDay();
        vm.Weekfirstday = vm.firstday.format('yyyy-MM-dd');
        vm.WeekLastday = vm.lastday.format('yyyy-MM-dd');
        vm.TodayDateformatted = TodayDate.format('yyyy-MM-dd');
        HolidaySelect = 'Holiday_x0020_Type/Id, Holiday_x0020_Type/Title,*';
        HolidayExpand = 'Holiday_x0020_Type/Id ,Holiday_x0020_Type/Title';
        HolidayFilter = 'Holiday_x0020_Type/Title eq \'' + Fixed + '\'';
        vm.HolidayOptions = {
            select: HolidaySelect,
            expand: HolidayExpand,
            filter: HolidayFilter
        };
        spcrud.read($http, vm.HolidayList, vm.HolidayOptions).then(function (Holidayresponse) {
            if (Holidayresponse.status === 200)
                //vm.HolidayType = Holidayresponse.data.d.results[0].Holiday_x0020_TypeId;
                for (i = 0; i < Holidayresponse.data.d.results.length; i++) {
                    if (vm.Weekfirstday <= Holidayresponse.data.d.results[i].Holiday_x0020_Date.split('T')[0] && Holidayresponse.data.d.results[i].Holiday_x0020_Date.split('T')[0] <= vm.WeekLastday) {
                        vm.FixedHolidayForTimesheet = Holidayresponse.data.d.results[i];
                        vm.HolidayTimesheetDiv = true;
                        //check holiday DAY
                        if (vm.Holiday === 1)
                            vm.MondayHoliday = 8;
                        else if (vm.Holiday === 2)
                            vm.TuesdayHoliday = 8;
                        else if (vm.Holiday === 3)
                            vm.WednesdayHoliday = 8;
                        else if (vm.Holiday === 4)
                            vm.ThursdayHoliday = 8
                        else if (vm.Holiday === 5)
                            vm.FridayHoliday = 8;
                        else if (vm.Holiday === 6)
                            vm.SaturdayHoliday = 8;
                        else if (vm.Holiday === 7)
                            vm.SundayHoliday = 8;
                        break;
                    }
                    else {
                        vm.HolidayTimesheetDiv = false;
                    }
                }

        }, function (error) {
            console.log('error', error);
        });
    };

    vm.readHolidayList();
    /* ****************************************************************************************** */
    vm.readEmployeeLeaves = function () {
        vm.TimesheetDivs = [];
        var EmployeeID = vm.LoggedInUserEmployeeId;
        // LeaveSelect = 'Employee_x0020_ID/Id, Holiday_x0020_Type/Title,*';
        // LeaveExpand = 'Employee_x0020_ID/Id ,Holiday_x0020_Type/Title';
        LeaveFilter = 'Employee_x0020_ID eq \'' + EmployeeID + '\'';
        vm.LeaveOptions = {
            // select: LeaveSelect,
            // expand: LeaveExpand,
            filter: LeaveFilter
        };
        spcrud.read($http, vm.LeaveRequestMaster, vm.LeaveOptions).then(function (Leaveresponse) {
            if (Leaveresponse.status === 200)
                //vm.HolidayType = Holidayresponse.data.d.results[0].Holiday_x0020_TypeId;
                for (i = 0; i < Leaveresponse.data.d.results.length; i++) {
                    if (vm.firstday.format('yyyy-MM-dd') <= Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0]) {
                        vm.LeaveStatus = Leaveresponse.data.d.results[i].Leave_x0020_Request_x0020_Master;
                        let diff = parseInt(Leaveresponse.data.d.results[i].Number_x0020_Of_x0020_Days);
                        if (moment(vm.firstday.format('yyyy-MM-dd')).isSame(Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0])) {
                            vm.TimesheetDivs = [
                                {
                                    'MonHrs': '',
                                    'TueHrs': '',
                                    'WedHrs': '',
                                    'ThuHrs': '',
                                    'FriHrs': '',
                                    'SatHrs': '',
                                    'SunHrs': '',
                                    'NBMonHrs': '',
                                    'NBTueHrs': '',
                                    'NBWedHrs': '',
                                    'NBThuHrs': '',
                                    'NBFriHrs': '',
                                    'NBSatHrs': '',
                                    'NBSunHrs': '',
                                    'ProjectTimesheetStatus': Leaveresponse.data.d.results[i].Status,
                                    'ddlProject': 'Leave',
                                    'ddlTasks': 'Leave'
                                }
                            ];
                            if (diff === 1) {
                                vm.TimesheetDivs[0].NBMonHrs = '08:00';
                            }
                            if (diff === 2) {
                                vm.TimesheetDivs[0].NBMonHrs = '08:00';
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                            }
                            if (diff === 3) {
                                vm.TimesheetDivs[0].NBMonHrs = '08:00';
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                            }
                            if (diff === 4) {
                                vm.TimesheetDivs[0].NBMonHrs = '08:00';
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                            }
                            if (diff === 5) {
                                vm.TimesheetDivs[0].NBMonHrs = '08:00';
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                                vm.TimesheetDivs[0].NBFriHrs = '08:00';
                            }
                            vm.calculateTotalHrs();
                        }
                        if (moment(vm.tue.format('yyyy-MM-dd')).isSame(Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0])) {
                            vm.TimesheetDivs = [
                                {
                                    'MonHrs': '',
                                    'TueHrs': '',
                                    'WedHrs': '',
                                    'ThuHrs': '',
                                    'FriHrs': '',
                                    'SatHrs': '',
                                    'SunHrs': '',
                                    'NBMonHrs': '',
                                    'NBTueHrs': '',
                                    'NBWedHrs': '',
                                    'NBThuHrs': '',
                                    'NBFriHrs': '',
                                    'NBSatHrs': '',
                                    'NBSunHrs': '',
                                    'ProjectTimesheetStatus': Leaveresponse.data.d.results[i].Status,
                                    'ddlProject': 'Leave',
                                    'ddlTasks': 'Leave'
                                }
                            ];
                            if (diff === 1) {
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                            }
                            if (diff === 2) {
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                            }
                            if (diff === 3) {
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                            }
                            if (diff === 4) {
                                vm.TimesheetDivs[0].NBTueHrs = '08:00';
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                                vm.TimesheetDivs[0].NBFriHrs = '08:00';
                            }
                            vm.calculateTotalHrs();
                        }
                        if (moment(vm.wed.format('yyyy-MM-dd')).isSame(Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0])) {
                            vm.TimesheetDivs = [
                                {
                                    'MonHrs': '',
                                    'TueHrs': '',
                                    'WedHrs': '',
                                    'ThuHrs': '',
                                    'FriHrs': '',
                                    'SatHrs': '',
                                    'SunHrs': '',
                                    'NBMonHrs': '',
                                    'NBTueHrs': '',
                                    'NBWedHrs': '',
                                    'NBThuHrs': '',
                                    'NBFriHrs': '',
                                    'NBSatHrs': '',
                                    'NBSunHrs': '',
                                    'ProjectTimesheetStatus': Leaveresponse.data.d.results[i].Status,
                                    'ddlProject': 'Leave',
                                    'ddlTasks': 'Leave'
                                }
                            ];
                            if (diff === 1) {
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                            }
                            if (diff === 2) {
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                            }
                            if (diff === 3) {
                                vm.TimesheetDivs[0].NBWedHrs = '08:00';
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                                vm.TimesheetDivs[0].NBFriHrs = '08:00';
                            }
                            vm.calculateTotalHrs();
                        }
                        if (moment(vm.thu.format('yyyy-MM-dd')).isSame(Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0])) {
                            vm.TimesheetDivs = [
                                {
                                    'MonHrs': '',
                                    'TueHrs': '',
                                    'WedHrs': '',
                                    'ThuHrs': '',
                                    'FriHrs': '',
                                    'SatHrs': '',
                                    'SunHrs': '',
                                    'NBMonHrs': '',
                                    'NBTueHrs': '',
                                    'NBWedHrs': '',
                                    'NBThuHrs': '',
                                    'NBFriHrs': '',
                                    'NBSatHrs': '',
                                    'NBSunHrs': '',
                                    'ProjectTimesheetStatus': Leaveresponse.data.d.results[i].Status,
                                    'ddlProject': 'Leave',
                                    'ddlTasks': 'Leave'
                                }
                            ];
                            if (diff === 1) {
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                            }
                            if (diff === 2) {
                                vm.TimesheetDivs[0].NBThuHrs = '08:00';
                                vm.TimesheetDivs[0].NBFriHrs = '08:00';
                            }
                            vm.calculateTotalHrs();
                        }
                        if (moment(vm.fri.format('yyyy-MM-dd')).isSame(Leaveresponse.data.d.results[i].Start_x0020_Date.split('T')[0])) {
                            vm.TimesheetDivs = [
                                {
                                    'MonHrs': '',
                                    'TueHrs': '',
                                    'WedHrs': '',
                                    'ThuHrs': '',
                                    'FriHrs': '',
                                    'SatHrs': '',
                                    'SunHrs': '',
                                    'NBMonHrs': '',
                                    'NBTueHrs': '',
                                    'NBWedHrs': '',
                                    'NBThuHrs': '',
                                    'NBFriHrs': '',
                                    'NBSatHrs': '',
                                    'NBSunHrs': '',
                                    'ProjectTimesheetStatus': Leaveresponse.data.d.results[i].Status,
                                    'ddlProject': 'Leave',
                                    'ddlTasks': 'Leave'
                                }
                            ];
                            if (diff === 1) {
                                vm.TimesheetDivs[0].NBFriHrs = '08:00';
                            }
                            vm.calculateTotalHrs();
                        }
                    }
                }
            if (vm.TimesheetDivs.length === 0) {
                vm.initTotalHour();
                vm.pushTimeSheet();
            }

        }, function (error) {
            console.log('error', error);
        });
    };

    vm.disableForLeave = function (Timesheet) {
        if (Timesheet.ddlProject === 'Leave') {
            return true;
        } else {
            return false;
        }
    }
    vm.showForLeave = function (Timesheet) {
        if (Timesheet === undefined) {
            return false;
        } else {
            return true;
        }
    }


    /* ****************************************************************************************** */
    // get projects from list :  Project Team Members and Projects
    vm.readProjectTeamMembersLists = function () {
        empSelect = 'Team_x0020_Members/Title,*';
        empExpand = 'Team_x0020_Members/Title';
        var filteroption = vm.loggedInUserName;
        empFilter = 'Team_x0020_Members/Title eq \'' + filteroption + '\'';
        vm.EmployeeProjectOptions = {
            select: empSelect,
            expand: empExpand,
            filter: empFilter
        };
        spcrud.read($http, vm.ProjectTeamMemberList, vm.EmployeeProjectOptions).then(function (Projectresp) {
            if (Projectresp.status === 200)
                var myJSON = JSON.stringify(Projectresp.data.d.results);
            vm.UserData = Projectresp.data.d.results;
            for (i = 0; i < Projectresp.data.d.results.length; i++) {
                vm.UserProject[i] = vm.UserData[i].Project_x0020_Master_x0020_ID;
            }
            vm.GetMyActiveProjects();
        }, function (error) {
            console.log('error', error);
        });
    };
    /* ****************************************************************************************** */
    vm.readTimesheetLists = function () {
        spcrud.read($http, vm.TimesheetList).then(function (Timesheetresponse) {
            if (Timesheetresponse.status === 200)
                vm.TimeSheet = Timesheetresponse.data.d.results;
        }, function (error) {
            console.log('error', error);
        });
    };
    vm.readTimesheetLists();
    /* ****************************************************************************************** */
    vm.readEmployeeTimesheetList = function () {
        spcrud.read($http, vm.EmployeeTimesheetList).then(function (EmployeeTimesheetresponse) {
            if (EmployeeTimesheetresponse.status === 200)
                vm.TimeSheet = EmployeeTimesheetresponse.data.d.results;
        }, function (error) {
            console.log('error', error);
        });
    };
    vm.readEmployeeTimesheetList();
    /* ****************************************************************************************** */
    vm.GetMyActiveProjects = function () {
        var projectID = vm.UserProject;
        vm.query = '';
        vm.UserProject.forEach(function (item) {
            vm.query = 'Project_x0020_Master_x0020_ID eq \'' + item + '\' or ' + vm.query;
        }, this);
        ProjectCategorySelect = 'Project_x0020_Category/Category,Project_x0020_Manager/Title,*';
        ProjectCategoryExpand = 'Project_x0020_Category/Category,Project_x0020_Manager/Title ';
        // var Active = "Active";
        // var Yes = "Yes";
        var CurrentDate = new Date();
        // ProjectFilter = 'Project_x0020_Master_x0020_ID eq \'' + projectID + '\' and Status eq \'' + Active + '\' ';
        // ProjectFilter = 'Status eq \'' + Active + '\' ';
        // or Isglobal \'' + Yes+ '\'
        filterquery = vm.query.substring(-3, vm.query.length - 3);
        vm.EmployeeProjectFilterOptions = {
            select: ProjectCategorySelect,
            expand: ProjectCategoryExpand,
            filter: filterquery,
        };
        spcrud.read($http, vm.ProjectsList, vm.EmployeeProjectFilterOptions).then(function (Projectresponse) {
            if (Projectresponse.status === 200)
                var myJSON = JSON.stringify(Projectresponse.data.d.results);
            //console.log(Projectresponse.data.d.results);
            vm.UserProjectData = Projectresponse.data.d.results;
            for (i = 0; i < Projectresponse.data.d.results.length; i++) {
                vm.ProjectTitle[i] = Projectresponse.data.d.results[i].Title;
            }
        }, function (error) {
            console.log('error', error);
        });
    }
    // get leaves and holiday project
    vm.GetHolidayAndLeaveProjects = function () {
        var projectID = vm.UserProject;
        var Holiday = "Holiday";
        var Leave = "Leave";
        vm.query = '';
        ProjectCategorySelect = 'Project_x0020_Category/Category,Project_x0020_Manager/Title,*';
        ProjectCategoryExpand = 'Project_x0020_Category/Category,Project_x0020_Manager/Title ';
        var CurrentDate = new Date();
        ProjectFilter = 'Title eq \'' + Holiday + '\' or Title eq \'' + Leave + '\' ';
        vm.EmployeeProjectFilterOptions = {
            select: ProjectCategorySelect,
            expand: ProjectCategoryExpand,
            filter: ProjectFilter,
        };
        spcrud.read($http, vm.ProjectsList, vm.EmployeeProjectFilterOptions).then(function (HolidayProjectresponse) {
            if (HolidayProjectresponse.status === 200)
                var myJSON = JSON.stringify(HolidayProjectresponse.data.d.results);
            for (i = 0; i < HolidayProjectresponse.data.d.results.length; i++) {
                if (HolidayProjectresponse.data.d.results[i].Title === "Holiday")
                    vm.HolidayProjectManager = HolidayProjectresponse.data.d.results[i].Project_x0020_Manager.Title;
                else if (HolidayProjectresponse.data.d.results[i].Title === "Leave")
                    vm.LeaveProjectManager = HolidayProjectresponse.data.d.results[i].Project_x0020_Manager.Title;
            }
        }, function (error) {
            console.log('error', error);
        });
    }
    vm.GetHolidayAndLeaveProjects();
    /* ----------------------------------------------------------------------------------------------------- */
    vm.readFinancialYearMasterList = function () {
        var status = "Current";
        finacialYearQuery = 'Status eq \'' + status + '\'';
        vm.FinancialYearFilterOptions = {
            filter: finacialYearQuery
        };
        spcrud.read($http, vm.FinancialYearMasterList, vm.FinancialYearFilterOptions).then(function (FinancialYearResponse) {
            if (FinancialYearResponse.status === 200)
                vm.FinancialYear = FinancialYearResponse.data.d.results[0].Title;
            vm.FinancialYearId = FinancialYearResponse.data.d.results[0].Id
        }, function (error) {
            console.log('error', error);
        });
    };
    vm.readFinancialYearMasterList();
    /* ----------------------------------------------------------------------------------------------------- */
    $scope.onChange = function (i) {
        var index = vm.ProjectTitle.indexOf(vm.TimesheetDivs[i].ddlProject);
        vm.ProjectTitle[index] = vm.TimesheetDivs[i].ddlProject;
        vm.Phases[i] = [];
        spcrud.read($http, vm.ProjectsList, vm.EmployeeProjectFilterOptions).then(function (Projectresponse) {
            if (Projectresponse.status === 200)
                vm.UserProjectData = Projectresponse.data.d.results;
            // check select dropdown project
            for (j = 0; j < Projectresponse.data.d.results.length; j++) {
                if (vm.TimesheetDivs[i].ddlProject === Projectresponse.data.d.results[j].Title) {
                    vm.ProjectTaskID = Projectresponse.data.d.results[j].Project_x0020_CategoryId;
                    vm.TimesheetDivs[i].ProjectManagerName = Projectresponse.data.d.results[j].Project_x0020_Manager.Title;
                    vm.PeojectManagerId = Projectresponse.data.d.results[j].Project_x0020_ManagerId;
                }
            }
            vm.getProjectCategoryList(i);
        }, function (error) {
            console.log('error', error);
        });
    }
    /* ----------------------------------------------------------------------------------------------------- */
    vm.DisplayPopUp = function (Description) {
        // $('#Descriptiontext').trigger("reset");
        $('#Descriptiontext').val("");
        vm.showModal = !vm.showModal;
    };
    /* ----------------------------------------------------------------------------------------------------- */
    vm.SaveTimesheetDescriptionAndCancel = function (Descriptiontext) {
        vm.showModal = false;
        $('#Descriptiontext').val("");
    }
    /* ----------------------------------------------------------------------------------------------------- */
    // get project category list
    vm.getProjectCategoryList = function (index) {
        var ProjectCategoryFilter = vm.ProjectTaskID;
        CategoryFilter = 'Id eq \'' + ProjectCategoryFilter + '\'';
        vm.ProjectCategoryFilterOptions = {
            filter: CategoryFilter
        };
        spcrud.read($http, vm.ProjectCategoryList, vm.ProjectCategoryFilterOptions).then(function (ProjectCategoryResponse) {
            if (ProjectCategoryResponse.status === 200)
                vm.ProjectCategory = ProjectCategoryResponse.data.d.results[0].CategoryID;
            vm.getPhasesList(index);
        }, function (error) {
            console.log('error', error);
        });
    };
    /* ----------------------------------------------------------------------------------------------------- */
    // get phases list
    vm.getPhasesList = function (index) {
        var ProjectPhaseFilter = vm.ProjectCategory;
        PhaseFilter = 'ProjectCategoryID eq \'' + ProjectPhaseFilter + '\'';
        vm.PhaseFilterOptions = {
            filter: PhaseFilter
        };
        spcrud.read($http, vm.PhasesList, vm.PhaseFilterOptions).then(function (PhaseResponse) {
            if (PhaseResponse.status === 200)
                //vm.PhaseResponse =  PhaseResponse.data.d.results[0].PhaseName;
                for (i = 0; i < PhaseResponse.data.d.results.length; i++) {
                    vm.Phases[index].push(PhaseResponse.data.d.results[i].PhaseName);
                }
            //vm.TimesheetDivs[index].ddlTasks = vm.Phases[0];
        }, function (error) {
            console.log('error', error);
        });
    };
    /* ----------------------------------------------------------------------------------------------------- */
    vm.CancelButton = function () {
        window.location = '/SitePages/Angular%20My%20Timesheet.aspx';
    }
    /* ----------------------------------------------------------------------------------------------------- */
    // Add New Item to RnR product catalog list
    vm.SaveTimeSheet = function (resp) {
        // get selected project Id
        vm.readSavedEmployeeTimesheetList();
        if (vm.SaveTimesheetStartDate == undefined && vm.SavedTimesheetId == undefined) {
            var Project = resp.ddlProject;
            ProjectCategorySelect = 'Project_x0020_Category/Category,Project_x0020_Manager/Title,*';
            ProjectCategoryExpand = 'Project_x0020_Category/Category,Project_x0020_Manager/Title ';
            Projectfilterquery = 'Title eq \'' + Project + '\'';
            vm.EmployeeProjectFilterOptions = {
                select: ProjectCategorySelect,
                expand: ProjectCategoryExpand,
                filter: Projectfilterquery
            };
            spcrud.read($http, vm.ProjectsList, vm.EmployeeProjectFilterOptions).then(function (SelectedProjectresponse) {
                if (SelectedProjectresponse.status === 200)
                    var myJSON = JSON.stringify(SelectedProjectresponse.data.d.results);
                vm.ProjectId = SelectedProjectresponse.data.d.results[0].ID;
            }, function (error) {
                console.log('error', error);
            });
            // Calculate total monday  hours
            if (resp.MonHrs === undefined || resp.NBMonHrs === undefined) {
                if (resp.MonHrs != undefined) {
                    vm.BillableMonday = resp.MonHrs;
                    vm.NonBillableMonday = 0;
                    vm.Monday = resp.MonHrs;
                    vm.MonHrs = resp.MonHrs.toString();
                    vm.TotalhrsMonday = vm.MonHrs;
                }
                else if (resp.NBMonHrs != undefined) {
                    vm.BillableMonday = 0;
                    vm.NonBillableMonday = resp.NBMonHrs;
                    vm.Monday = resp.NBMonHrs;
                    vm.NBMonHrs = resp.NBMonHrs.toString();
                    vm.TotalhrsMonday = vm.NBMonHrs;
                }
                else {
                    vm.BillableMonday = 0;
                    vm.NonBillableMonday = 0;
                    vm.Monday = 0;
                    vm.TotalhrsMonday = null;
                }
            }
            else {
                vm.BillableMonday = resp.MonHrs;
                vm.NonBillableMonday = resp.NBMonHrs;
                vm.Monday = resp.MonHrs + resp.NBMonHrs;
                vm.TotalhrsMonday = vm.Monday.toString();
            }
            // Calculate total tuesday  hours
            if (resp.TueHrs === undefined || resp.NBTueHrs === undefined) {
                if (resp.TueHrs != undefined) {
                    vm.BillableTuesday = resp.TueHrs;
                    vm.NonBillableTuesday = 0;
                    vm.tuesday = resp.TueHrs;
                    vm.TueHrs = resp.TueHrs.toString();
                    vm.TotalhrsTuesday = resp.TueHrs.toString();
                }
                else if (resp.NBTueHrs != undefined) {
                    vm.BillableTuesday = 0;
                    vm.NonBillableTuesday = resp.NBTueHrs;
                    vm.tuesday = resp.NBTueHrs;
                    vm.NBTueHrs = resp.NBTueHrs.toString();;
                    vm.TotalhrsTuesday = resp.NBTueHrs.toString();
                }
                else {
                    vm.BillableTuesday = 0;
                    vm.NonBillableTuesday = 0;
                    vm.tuesday = 0;
                    vm.TotalhrsTuesday = null;
                }
            }
            else {
                vm.BillableTuesday = resp.TueHrs;
                vm.NonBillableTuesday = resp.NBTueHrs;
                vm.tuesday = resp.TueHrs + resp.NBTueHrs;
                vm.TotalhrsTuesday = vm.tuesday.toString();
            }
            // Calculate total wednesday  hours
            if (resp.WedHrs === undefined || resp.NBWedHrs === undefined) {
                if (resp.WedHrs != undefined) {
                    vm.BillableWednesday = resp.WedHrs;
                    vm.NonBillableWednesday = 0;
                    vm.wednesday = resp.WedHrs;
                    vm.WedHrs = resp.WedHrs.toString();
                    vm.TotalhrsWednesday = resp.WedHrs.toString();
                }
                else if (resp.NBWedHrs != undefined) {
                    vm.BillableWednesday = 0;
                    vm.NonBillableWednesday = resp.NBWedHrs;
                    vm.wednesday = resp.NBWedHrs;
                    vm.NBWedHrs = resp.NBWedHrs.toString();
                    vm.TotalhrsWednesday = resp.NBWedHrs.toString();
                }
                else {
                    vm.BillableWednesday = 0;
                    vm.NonBillableWednesday = 0;
                    vm.wednesday = 0;
                    vm.TotalhrsWednesday = null;
                }
            }
            else {
                vm.BillableWednesday = resp.WedHrs;
                vm.NonBillableWednesday = resp.NBWedHrs;
                vm.wednesday = resp.WedHrs + resp.NBWedHrs;
                vm.TotalhrsWednesday = vm.wednesday.toString();
            }
            // Calculate total thursday  hours
            if (resp.ThuHrs === undefined || resp.NBThuHrs === undefined) {
                if (resp.ThuHrs != undefined) {
                    vm.BillableThursday = resp.ThuHrs;
                    vm.NonBillableThursday = 0;
                    vm.thursday = resp.ThuHrs;
                    vm.ThuHrs = resp.ThuHrs.toString();
                    vm.TotalhrsThursday = resp.ThuHrs.toString();
                }
                else if (resp.NBThuHrs != undefined) {
                    vm.BillableThursday = 0;
                    vm.NonBillableThursday = resp.NBThuHrs;
                    vm.thursday = resp.NBThuHrs;
                    vm.NBThuHrs = resp.NBThuHrs.toString();
                    vm.TotalhrsThursday = resp.NBThuHrs.toString();
                }
                else {
                    vm.BillableThursday = 0;
                    vm.NonBillableThursday = 0;
                    vm.thursday = 0;
                    vm.TotalhrsThursday = null;
                }
            }
            else {
                vm.BillableThursday = resp.ThuHrs;
                vm.NonBillableThursday = resp.NBThuHrs;
                vm.thursday = resp.ThuHrs + resp.NBThuHrs;
                vm.TotalhrsThursday = vm.thursday.toString();
            }
            // Calculate total Friday  hours
            if (resp.FriHrs === undefined || resp.NBFriHrs === undefined) {
                if (resp.FriHrs != undefined) {
                    vm.BillableFriday = resp.FriHrs;
                    vm.NonBillableFriday = 0;
                    vm.Friday = vm.FriHrs;
                    vm.FriHrs = resp.FriHrs.toString();
                    vm.TotalhrsFriday = resp.FriHrs.toString();
                }
                else if (resp.NBFriHrs != undefined) {
                    vm.BillableFriday = 0;
                    vm.NonBillableFriday = resp.NBFriHrs;
                    vm.Friday = vm.NBFriHrs;
                    vm.NBFriHrs = resp.NBFriHrs.toString();
                    vm.TotalhrsFriday = resp.NBFriHrs.toString();
                }
                else {
                    vm.BillableFriday = 0;
                    vm.NonBillableFriday = 0;
                    vm.Friday = 0;
                    vm.TotalhrsFriday = null;
                }
            }
            else {
                vm.BillableFriday = resp.FriHrs;
                vm.NonBillableFriday = resp.NBFriHrs;
                vm.Friday = resp.FriHrs + resp.NBFriHrs;
                vm.TotalhrsFriday = vm.Friday.toString();
            }
            // Calculate total Saturday hours
            if (resp.SatHrs === undefined || resp.NBSatHrs === undefined) {
                if (resp.SatHrs != undefined) {
                    vm.BillableSaturday = resp.SatHrs;
                    vm.NonBillableSaturday = 0;
                    vm.Saturday = resp.SatHrs;
                    vm.SatHrs = resp.SatHrs.toString();
                    vm.TotalhrsSaturday = resp.SatHrs.toString();
                }
                else if (resp.NBSatHrs != undefined) {
                    vm.BillableSaturday = 0;
                    vm.NonBillableSaturday = resp.NBSatHrs;
                    vm.Saturday = resp.NBSatHrs;
                    vm.NBSatHrs = resp.NBSatHrs.toString();
                    vm.TotalhrsSaturday = resp.NBSatHrs.toString();
                }
                else {
                    vm.BillableSaturday = 0;
                    vm.NonBillableSaturday = 0;
                    vm.Saturday = 0;
                    vm.TotalhrsSaturday = null
                }
            }
            else {
                vm.BillableSaturday = resp.SatHrs;
                vm.NonBillableSaturday = resp.NBSatHrs;
                vm.Saturday = resp.SatHrs + resp.NBSatHrs;
                vm.TotalhrsSaturday = vm.Saturday.toString();
            }
            // Calculate total Sunday hours
            if (resp.SunHrs === undefined || resp.NBSunHrs === undefined) {
                if (resp.SunHrs != undefined) {
                    vm.BillableSunday = resp.SunHrs;
                    vm.NonBillableSunday = 0;
                    vm.Sunday = resp.SunHrs;
                    vm.SunHrs = resp.SunHrs.toString();
                    vm.TotalhrsSunday = resp.SunHrs.toString();
                }
                else if (resp.NBSunHrs != undefined) {
                    vm.BillableSunday = 0;
                    vm.NonBillableSunday = resp.NBSunHrs;
                    vm.Sunday = resp.NBSunHrs;
                    vm.NBSunHrs = resp.NBSunHrs.toString();
                    vm.TotalhrsSunday = resp.NBSunHrs.toString();
                }
                else {
                    vm.BillableSunday = 0;
                    vm.NonBillableSunday = 0;
                    vm.Sunday = 0;
                    vm.TotalhrsSunday = null
                }
            }
            else {
                vm.BillableSunday = resp.SunHrs;
                vm.NonBillableSunday = resp.NBSunHrs;
                vm.Sunday = resp.SunHrs + resp.NBSunHrs;
                vm.TotalhrsSunday = vm.Sunday.toString();
            }
            //calculate total hours
            let TotalHours = vm.Monday + vm.tuesday + vm.wednesday + vm.thursday + vm.Friday + vm.Saturday + vm.Sunday;
            vm.TotalhrsTimesheet = TotalHours.toString();
            vm.TotalBillable = vm.BillableMonday + vm.BillableTuesday + vm.BillableWednesday + vm.BillableThursday + vm.BillableFriday + vm.BillableSaturday + vm.BillableSunday;
            vm.TotalBillableHrs = vm.TotalBillable.toString();
            vm.TotalNonBillable = vm.NonBillableSunday + vm.NonBillableSaturday + vm.NonBillableFriday + vm.NonBillableThursday + vm.NonBillableWednesday + vm.NonBillableTuesday + vm.NonBillableMonday;
            vm.TotalNonBillableHrs = vm.TotalNonBillable.toString();
            // vm.Currentyear = currentTime.getFullYear();
            // Save data
            if (resp === undefined)
                alert("Enter Timesheet Details");
            else {
                if (resp.ddlProject === undefined)
                    alert("Please select project");
                else if (resp.ddlTasks === undefined)
                    alert("Please select task");

                else {
                    // check timesheet already saved or not if it is saved then update list else create nee item
                    // if(vm.SaveTimesheetStartDate == null && vm.SavedTimesheetId == null)
                    // {
                    spcrud.create($http, vm.EmployeeTimesheetList, {
                        //'Employee/Id':vm.loggedInUserName,
                        'Title': vm.LoggedInUserEmployeeId, // send employee id as title
                        'Employee_x0020_Name': vm.loggedInUserName,
                        'Timesheet_x0020_Start_x0020_Date': vm.firstday,
                        'Timesheet_x0020_End_x0020_Date': vm.lastday,
                        'Employee_x0020_Department': vm.EmployeeDepartment,
                        'Email_x0020_Status': 'False',
                        'Submitted_x0020_Status': 'Not Submitted',
                        'TotalhrsMonday': vm.TotalhrsMonday,
                        'TotalhrsTuesday': vm.TotalhrsTuesday,
                        'TotalhrsWednesday': vm.TotalhrsWednesday,
                        'TotalhrsThursday': vm.TotalhrsThursday,
                        'TotalhrsFriday': vm.TotalhrsFriday,
                        'TotalhrsSaturday': vm.TotalhrsSaturday,
                        'TotalhrsSunday': vm.TotalhrsSunday,
                        'TotalhrsTimesheet': vm.TotalhrsTimesheet,
                        'Billable_x0020_Hours': vm.TotalBillableHrs,
                        'Non_x0020_Billable_x0020_Hours': vm.TotalNonBillableHrs,
                        //'Approver_x0020_UserId': vm.PeojectManagerId, // people and group column
                        // 'WeeK_x0020_Number': vm.weeknumber,
                        'Start_x0020_Date': vm.firstday,
                        'End_x0020_Date': vm.lastday,
                        'EmployeeId': vm.EmployeePersonalListId,// people and group column
                        'Financial_x0020_IDId': vm.FinancialYearId,// lookup column list financial year master
                        'Financial_x0020_YearId': vm.FinancialYearId, // lookup column financial year master
                    }).then(function (SaveEmployeeTimesheetresponse) {
                        vm.EmployeeTimesheetId = SaveEmployeeTimesheetresponse.data.d.Id;
                        // Add timesheet details to timesheet list
                        spcrud.create($http, vm.TimesheetList, {
                            //'Employee/Id':vm.loggedInUserName,
                            'Title': 'No Title', 'Task': resp.ddlTasks,
                            'Mondayhrs': vm.BillableMonday.toString(), 'Mondaydesc': 'Monday description',
                            'Tuesdayhrs': vm.BillableTuesday.toString(), 'Tuesdaydesc': 'tuesday description',
                            'Wednesdayhrs': vm.BillableWednesday.toString(), 'Wednesdaydesc': 'wednesday description',
                            'Thursdayhrs': vm.BillableThursday.toString(), 'Thursdaydesc': 'Thursday description',
                            'Fridayhrs': vm.BillableFriday.toString(), 'Fridaydesc': 'Friday description',
                            'Saturdayhrs': vm.BillableSaturday.toString(), 'Saturdaydesc': 'saturday description',
                            'Sundayhrs': vm.BillableSunday.toString(), 'Sundaydesc': 'Sunday description',
                            'Billable': vm.TotalBillableHrs,
                            'Timesheet_x0020_Start_x0020_Date': vm.firstday, 'Timesheet_x0020_End_x0020_Date': vm.lastday,
                            'Timesheet_x0020_ID': vm.EmployeeTimesheetId.toString(),
                            'Mondaynbhrs': vm.NonBillableMonday.toString(), 'Tuesdaynbhrs': vm.NonBillableTuesday.toString(),
                            'Wednesdaynbhrs': vm.NonBillableWednesday.toString(), 'Thursdaynbhrs': vm.NonBillableThursday.toString(),
                            'Fridaynbhrs': vm.NonBillableFriday.toString(), 'Saturdaynbhrs': vm.NonBillableSaturday.toString(),
                            'Sundaynbhrs': vm.NonBillableSunday.toString(),
                            // 'week_x0020_number' : 123, // discuss and decide what to add here
                            'Project_x0020_Timesheet_x0020_St': 'Saved',
                            'Approver_x0020_UserId': vm.PeojectManagerId, // people and group column
                            'Start_x0020_Date': vm.firstday,
                            'End_x0020_Date': vm.lastday,
                            'Mondaydescnb': 'Test', 'Tuesdaydescnb': 'Test', 'Wednesdaydescnb': 'Test',
                            'Thursdaydescnb': 'Test', 'Fridaydescnb': 'Test', 'Saturdaydescnb': 'Test', 'Sundaydescnb': 'Test',
                            'ProjectId': vm.ProjectId, // lookup column
                            'Timesheet_x0020_Status': 'Not Submitted'
                            //'UpdationFlag' : 'True',
                        }).then(function (SaveTimesheetresponse) {
                            alert("Timesheet Saved successfully");
                            //vm.SavedTimesheetId = SaveTimesheetresponse.data.d.Id;
                        });
                    });
                }
            }
        }
        else {
            spcrud.update($http, vm.EmployeeTimesheetList, vm.SavedTimesheetId, {
                //'Employee/Id':vm.loggedInUserName,
                'Title': vm.LoggedInUserEmployeeId, // send employee id as title
                'Employee_x0020_Name': vm.loggedInUserName,
                'Timesheet_x0020_Start_x0020_Date': vm.firstday,
                'Timesheet_x0020_End_x0020_Date': vm.lastday,
                'Employee_x0020_Department': vm.EmployeeDepartment,
                'Email_x0020_Status': 'False',
                'Submitted_x0020_Status': 'Not Submitted',
                'TotalhrsMonday': vm.TotalhrsMonday, 'TotalhrsTuesday': vm.TotalhrsTuesday,
                'TotalhrsWednesday': vm.TotalhrsWednesday, 'TotalhrsThursday': vm.TotalhrsThursday,
                'TotalhrsFriday': vm.TotalhrsFriday, 'TotalhrsSaturday': vm.TotalhrsSaturday,
                'TotalhrsSunday': vm.TotalhrsSunday, 'TotalhrsTimesheet': vm.TotalhrsTimesheet,
                'Billable_x0020_Hours': vm.TotalBillableHrs,
                'Non_x0020_Billable_x0020_Hours': vm.TotalNonBillableHrs,
                'Approver_x0020_UserId': vm.PeojectManagerId, // people and group column
                // 'WeeK_x0020_Number': vm.weeknumber,
                'Start_x0020_Date': vm.firstday,
                'End_x0020_Date': vm.lastday,
                'EmployeeId': vm.LoggedInUserEmployeeId,// people and group column
                'Financial_x0020_IDId': vm.FinancialYearId,// lookup column list financial year master
                'Financial_x0020_YearId': vm.FinancialYearId, // lookup column financial year master
            }).then(function (SaveEmployeeTimesheetresponse) {
                // vm.EmployeeTimesheetId = SaveEmployeeTimesheetresponse.data.d.Id;
                // Add timesheet details to timesheet list
                spcrud.update($http, vm.TimesheetList, vm.SavedTimesheetId, {
                    //'Employee/Id':vm.loggedInUserName,
                    'Title': 'No Title',
                    'Task': resp.ddlTasks,
                    'Mondayhrs': vm.BillableMonday, 'Mondaydesc': 'Monday description',
                    'Tuesdayhrs': vm.BillableTuesday, 'Tuesdaydesc': 'tuesday description',
                    'Wednesdayhrs': vm.BillableWednesday, 'Wednesdaydesc': 'wednesday description',
                    'Thursdayhrs': vm.BillableThursday, 'Thursdaydesc': 'Thursday description',
                    'Fridayhrs': vm.BillableFriday, 'Fridaydesc': 'Friday description',
                    'Saturdayhrs': vm.BillableSaturday, 'Saturdaydesc': 'saturday description',
                    'Sundayhrs': vm.BillableSunday, 'Sundaydesc': 'Sunday description',
                    'Billable': vm.TotalBillableHrs,
                    'Timesheet_x0020_Start_x0020_Date': vm.firstday, 'Timesheet_x0020_End_x0020_Date': vm.lastday,
                    'Timesheet_x0020_ID': vm.EmployeeTimesheetId,
                    'Mondaynbhrs': vm.NonBillableMonday, 'Tuesdaynbhrs': vm.NonBillableTuesday,
                    'Wednesdaynbhrs': vm.NonBillableWednesday, 'Thursdaynbhrs': vm.NonBillableThursday,
                    'Fridaynbhrs': vm.NonBillableFriday, 'Saturdaynbhrs': vm.NonBillableSaturday,
                    'Sundaynbhrs': vm.NonBillableSunday,
                    // 'week_x0020_number' : 123, // discuss and decide what to add here
                    'Project_x0020_Timesheet_x0020_St': 'Saved',
                    // 'Approver_x0020_User' : 'ABCD', // people and group column
                    'Start_x0020_Date': vm.firstday, 'End_x0020_Date': vm.lastday,
                    'Mondaydescnb': 'Test', 'Tuesdaydescnb': 'Test', 'Wednesdaydescnb': 'Test',
                    'Thursdaydescnb': 'Test', 'Fridaydescnb': 'Test', 'Saturdaydescnb': 'Test', 'Sundaydescnb': 'Test',
                    'ProjectId': vm.ProjectId, // lookup column
                    'Timesheet_x0020_Status': 'Not Submitted'
                    //'UpdationFlag' : 'True',
                }).then(function (SaveTimesheetresponse) {
                    alert("Timesheet Saved successfully");
                    //vm.SavedTimesheetId = SaveTimesheetresponse.data.d.Id;
                });
            });
        }
        //}
        // }

    }
    // vm.readSavedEmployeeTimesheetList();
    // get employee timesheet for dispaly
    vm.readSavedEmployeeTimesheetList = function () {
        var FirstDay = new Date(vm.curr.setDate(vm.first + 1));
        var ConvertedFirstDay = FirstDay.format('yyyy-MM-dd');
        var LastDay = vm.lastday.format('yyyy-MM-dd');
        var LoggedInUser = vm.loggedInUserName;
        filterSavedEmployeeTimesheetquery = 'Employee_x0020_Name eq \'' + LoggedInUser + '\' ';
        vm.SavedEmployeeTimesheetFilterOptions = {
            filter: filterSavedEmployeeTimesheetquery
        };
        spcrud.read($http, vm.EmployeeTimesheetList, vm.SavedEmployeeTimesheetFilterOptions).then(function (SavedEmployeeTimesheetresponse) {
            if (SavedEmployeeTimesheetresponse.status === 200)
                vm.SavedTimeSheet = SavedEmployeeTimesheetresponse.data.d.results;
            for (i = 0; i < SavedEmployeeTimesheetresponse.data.d.results.length; i++) {
                if (SavedEmployeeTimesheetresponse.data.d.results[i].Start_x0020_Date.split('T')[0] === ConvertedFirstDay) {
                    //vm.TimesheetDivs= SavedEmployeeTimesheetresponse.data.d.results[i];
                    vm.SaveTimesheetStartDate = SavedEmployeeTimesheetresponse.data.d.results[i].Start_x0020_Date;
                    vm.SavedTimesheetId = SavedEmployeeTimesheetresponse.data.d.results[i].Id;
                    vm.readSavedTimesheetList(vm.SavedTimesheetId);
                    vm.WeekNumber = SavedEmployeeTimesheetresponse.data.d.results[i].WeeK_x0020_Number;
                    vm.TotalMondayhrs = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsMonday;
                    vm.TotalTuesdayhrs = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsTuesday;
                    vm.TotalhrsWednesday = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsWednesday;
                    vm.TotalhrsThursday = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsThursday;
                    vm.TotalhrsFriday = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsFriday;
                    vm.TotalhrsTimesheet = SavedEmployeeTimesheetresponse.data.d.results[i].TotalhrsTimesheet;
                }
            }
        },
            function (error) {
                console.log('error', error);
            });

    };
    // get timesheet list
    // vm.readSavedTimesheetList = function (RequiredTimesheetId) {
    //     var FirstDay = new Date(vm.curr.setDate(vm.first + 1));
    //     var ConvertedFirstDay = FirstDay.format('yyyy-MM-dd');
    //     var LastDay = vm.lastday.format('yyyy-MM-dd');
    //     vm.RequiredTimesheetId = RequiredTimesheetId;
    //     TimesheetSelect = 'Project/Title,*';
    //     TimesheetExpand = 'Project/Title';
    //     TimesheetFilter = 'Timesheet_x0020_ID eq \'' + vm.RequiredTimesheetId + '\' ';

    //     vm.TimesheetOptions = {
    //         select: TimesheetSelect,
    //         expand: TimesheetExpand,
    //         filter: TimesheetFilter
    //     };
    //     spcrud.read($http, vm.TimesheetList, vm.TimesheetOptions).then(function (SavedTimesheetresponse) {
    //         if (SavedTimesheetresponse.status === 200) {
    //             vm.TimesheetProject = SavedTimesheetresponse.data.d.results[0].Project.Title;
    //             vm.Timesheettask = SavedTimesheetresponse.data.d.results[0].Task;
    //             vm.BillableMondayhrs = SavedTimesheetresponse.data.d.results[0].Mondayhrs;
    //             vm.NonBillableMondayhrs = SavedTimesheetresponse.data.d.results[0].Mondaynbhrs;
    //             vm.MondayDescription = SavedTimesheetresponse.data.d.results[0].Mondaydesc;
    //             vm.NonBillableMondayDescription = SavedTimesheetresponse.data.d.results[0].Mondaydescnb;
    //             vm.BillableTuesdayhrs = SavedTimesheetresponse.data.d.results[0].Tuesdayhrs;
    //             vm.NonBillableTuesdayhrs = SavedTimesheetresponse.data.d.results[0].Tuesdaynbhrs;
    //             vm.Tuesdaydescription = SavedTimesheetresponse.data.d.results[0].Tuesdaydesc;
    //             vm.NonBillableTuesdayDescription = SavedTimesheetresponse.data.d.results[0].Tuesdaydescnb;
    //             vm.BillableWednesdayhrs = SavedTimesheetresponse.data.d.results[0].Wednesdayhrs;
    //             vm.NonBillableWednesdayHrs = SavedTimesheetresponse.data.d.results[0].Wednesdaynbhrs;
    //             vm.Wednesdaydescription = SavedTimesheetresponse.data.d.results[0].Wednesdaydesc;
    //             vm.NonBillablewednesdayDescription = SavedTimesheetresponse.data.d.results[0].Wednesdaydescnb;
    //             vm.BillableThursdayhrs = SavedTimesheetresponse.data.d.results[0].Thursdayhrs;
    //             vm.NonBillableThursdayHrs = SavedTimesheetresponse.data.d.results[0].Thursdaynbhrs;
    //             vm.thursdaydescription = SavedTimesheetresponse.data.d.results[0].Thursdaydesc;
    //             vm.NonBillablethursadayDesription = SavedTimesheetresponse.data.d.results[0].Thursdaydescnb;
    //             vm.BillableFridayhrs = SavedTimesheetresponse.data.d.results[0].Fridayhrs;
    //             vm.NonBillableFridayHrs = SavedTimesheetresponse.data.d.results[0].Fridaynbhrs;
    //             vm.FridayDescription = SavedTimesheetresponse.data.d.results[0].Fridaydesc;
    //             vm.NonBillableFridayDescription = SavedTimesheetresponse.data.d.results[0].Fridaydescnb;
    //             vm.BillableSaturdayHrs = SavedTimesheetresponse.data.d.results[0].Saturdayhrs;
    //             vm.NonBillableSaturdayHrs = SavedTimesheetresponse.data.d.results[0].Saturdaynbhrs;
    //             vm.SaturdayDesription = SavedTimesheetresponse.data.d.results[0].Saturdaydesc;
    //             vm.NonBillableSaturdayDesription = SavedTimesheetresponse.data.d.results[0].Saturdaydescnb;
    //             vm.BillableSundayHrs = SavedTimesheetresponse.data.d.results[0].Sundayhrs;
    //             vm.NonBillableSundayHrs = SavedTimesheetresponse.data.d.results[0].Sundaynbhrs
    //             vm.SundayDescription = SavedTimesheetresponse.data.d.results[0].Sundaydesc;
    //             vm.NonBillableSundayDescription = SavedTimesheetresponse.data.d.results[0].Sundaydescnb;
    //             vm.TimesheetStatus = SavedTimesheetresponse.data.d.results[0].Timesheet_x0020_Status;
    //             vm.TimesheetStartDate = SavedTimesheetresponse.data.d.results[0].Start_x0020_Date;
    //             vm.TimesheetEndDate = SavedTimesheetresponse.data.d.results[0].End_x0020_Date;
    //             vm.ProjectTimesheetStatus = SavedTimesheetresponse.data.d.results[0].Project_x0020_Timesheet_x0020_St;
    //         }
    //     }, function (error) {
    //         console.log('error', error);
    //     });
    // };
    // get timesheet list
    vm.readSavedTimesheetList = function (RequiredTimesheetId) {
        var FirstDay = new Date(vm.curr.setDate(vm.first + 1));
        var ConvertedFirstDay = FirstDay.format('yyyy-MM-dd');
        var LastDay = vm.lastday.format('yyyy-MM-dd');
        vm.RequiredTimesheetId = RequiredTimesheetId;
        TimesheetSelect = 'Project/Title,*';
        TimesheetExpand = 'Project/Title';
        TimesheetFilter = 'Timesheet_x0020_ID eq \'' + vm.RequiredTimesheetId + '\' ';

        vm.TimesheetOptions = {
            select: TimesheetSelect,
            expand: TimesheetExpand,
            filter: TimesheetFilter
        };
        var LoggedInUser = vm.loggedInUserName;
        filterSavedEmployeeTimesheetquery = 'Employee_x0020_Name eq \'' + LoggedInUser + '\' ';

        spcrud.read($http, vm.TimesheetList, vm.TimesheetOptions).then(function (SavedTimesheetresponse) {
            if (SavedTimesheetresponse.status === 200) {
                if (SavedTimesheetresponse.data.d.results.length > 0) {
                    vm.TimesheetDivs = SavedTimesheetresponse.data.d.results[0];
                    vm.TimesheetProject = SavedTimesheetresponse.data.d.results[0].Project.Title; vm.item.ddlProject = vm.TimesheetProject;
                    vm.Timesheettask = SavedTimesheetresponse.data.d.results[0].Task; vm.item.ddlTasks = vm.Timesheettask;
                    vm.BillableMondayhrs = SavedTimesheetresponse.data.d.results[0].Mondayhrs; vm.item.MonHrs = vm.BillableMondayhrs;
                    vm.NonBillableMondayhrs = SavedTimesheetresponse.data.d.results[0].Mondaynbhrs; vm.item.NBMonHrs = vm.NonBillableMondayhrs;
                    vm.MondayDescription = SavedTimesheetresponse.data.d.results[0].Mondaydesc;
                    vm.NonBillableMondayDescription = SavedTimesheetresponse.data.d.results[0].Mondaydescnb;
                    vm.BillableTuesdayhrs = SavedTimesheetresponse.data.d.results[0].Tuesdayhrs; vm.item.TueHrs = vm.BillableTuesdayhrs;
                    vm.NonBillableTuesdayhrs = SavedTimesheetresponse.data.d.results[0].Tuesdaynbhrs; vm.item.NBTueHrs = vm.NonBillableTuesdayhrs;
                    vm.Tuesdaydescription = SavedTimesheetresponse.data.d.results[0].Tuesdaydesc;
                    vm.NonBillableTuesdayDescription = SavedTimesheetresponse.data.d.results[0].Tuesdaydescnb;
                    vm.BillableWednesdayhrs = SavedTimesheetresponse.data.d.results[0].Wednesdayhrs; vm.item.WedHrs = vm.BillableWednesdayhrs;
                    vm.NonBillableWednesdayHrs = SavedTimesheetresponse.data.d.results[0].Wednesdaynbhrs; vm.item.NBWedHrs = vm.NonBillableWednesdayHrs;
                    vm.Wednesdaydescription = SavedTimesheetresponse.data.d.results[0].Wednesdaydesc;
                    vm.NonBillablewednesdayDescription = SavedTimesheetresponse.data.d.results[0].Wednesdaydescnb;
                    vm.BillableThursdayhrs = SavedTimesheetresponse.data.d.results[0].Thursdayhrs; vm.item.ThuHrs = vm.BillableThursdayhrs;
                    vm.NonBillableThursdayHrs = SavedTimesheetresponse.data.d.results[0].Thursdaynbhrs; vm.item.NBThuHrs = vm.NonBillableThursdayHrs;
                    vm.thursdaydescription = SavedTimesheetresponse.data.d.results[0].Thursdaydesc;
                    vm.NonBillablethursadayDesription = SavedTimesheetresponse.data.d.results[0].Thursdaydescnb;
                    vm.BillableFridayhrs = SavedTimesheetresponse.data.d.results[0].Fridayhrs; vm.item.FriHrs = vm.BillableFridayhrs;
                    vm.NonBillableFridayHrs = SavedTimesheetresponse.data.d.results[0].Fridaynbhrs; vm.item.NBFriHrs = vm.NonBillableFridayHrs;
                    vm.FridayDescription = SavedTimesheetresponse.data.d.results[0].Fridaydesc;
                    vm.NonBillableFridayDescription = SavedTimesheetresponse.data.d.results[0].Fridaydescnb;
                    vm.BillableSaturdayHrs = SavedTimesheetresponse.data.d.results[0].Saturdayhrs; vm.item.SatHrs = vm.BillableSaturdayHrs;
                    vm.NonBillableSaturdayHrs = SavedTimesheetresponse.data.d.results[0].Saturdaynbhrs; vm.item.NBSatHrs = vm.NonBillableSaturdayHrs;
                    vm.SaturdayDesription = SavedTimesheetresponse.data.d.results[0].Saturdaydesc;
                    vm.NonBillableSaturdayDesription = SavedTimesheetresponse.data.d.results[0].Saturdaydescnb;
                    vm.BillableSundayHrs = SavedTimesheetresponse.data.d.results[0].Sundayhrs; vm.item.SunHrs = vm.BillableSundayHrs;
                    vm.NonBillableSundayHrs = SavedTimesheetresponse.data.d.results[0].Sundaynbhrs; vm.item.NBSunHrs = vm.NonBillableSundayHrs;
                    vm.SundayDescription = SavedTimesheetresponse.data.d.results[0].Sundaydesc;
                    vm.NonBillableSundayDescription = SavedTimesheetresponse.data.d.results[0].Sundaydescnb;
                    vm.TimesheetStatus = SavedTimesheetresponse.data.d.results[0].Timesheet_x0020_Status;
                    vm.TimesheetStartDate = SavedTimesheetresponse.data.d.results[0].Start_x0020_Date;
                    vm.TimesheetEndDate = SavedTimesheetresponse.data.d.results[0].End_x0020_Date;
                    vm.ProjectTimesheetStatus = SavedTimesheetresponse.data.d.results[0].Project_x0020_Timesheet_x0020_St;
                }
                else {
                    //vm.pushTimeSheet();
                }
            }
        }, function (error) {
            console.log('error', error);
        });
    };
    /* --------------------------------------------------End------------------------------------------------- */
    vm.SubmitTimeSheet = function (Submitresp) {
        // Calculate total monday  hours
        if (Submitresp.MonHrs === undefined || Submitresp.NBMonHrs === undefined) {
            if (Submitresp.MonHrs != undefined) {
                vm.BillableMonday = Submitresp.MonHrs;
                vm.NonBillableMonday = 0;
                vm.TotalhrsMonday = Submitresp.MonHrs;
            }
            else if (Submitresp.NBMonHrs != undefined) {
                vm.BillableMonday = 0;
                vm.NonBillableMonday = Submitresp.NBMonHrs;
                vm.TotalhrsMonday = Submitresp.NBMonHrs;
            }
            else {
                vm.BillableMonday = 0;
                vm.NonBillableMonday = 0;
                vm.TotalhrsMonday = null;
            }
        }
        else {
            vm.BillableMonday = Submitresp.MonHrs;
            vm.NonBillableMonday = Submitresp.NBMonHrs;
            vm.TotalhrsMonday = Submitresp.MonHrs + Submitresp.NBMonHrs;
        }
        // Calculate total tuesday  hours
        if (Submitresp.TueHrs === undefined || Submitresp.NBTueHrs === undefined) {
            if (Submitresp.TueHrs != undefined) {

                vm.Billabletuesday = Submitresp.TueHrs;
                vm.NonBillabletuesday = 0;
                vm.TotalhrsTuesday = Submitresp.TueHrs;
            }
            else if (Submitresp.NBTueHrs != undefined) {
                vm.Billabletuesday = 0;
                vm.NonBillabletuesday = Submitresp.NBTueHrs;
                vm.TotalhrsTuesday = Submitresp.NBTueHrs;
            }
            else {
                vm.Billabletuesday = 0;
                vm.NonBillabletuesday = 0;
                vm.TotalhrsTuesday = null;
            }
        }
        else {
            vm.Billabletuesday = Submitresp.TueHrs;
            vm.NonBillabletuesday = Submitresp.NBTueHrs;
            vm.TotalhrsTuesday = Submitresp.TueHrs + Submitresp.NBTueHrs;
        }
        // Calculate total wednesday  hours
        if (Submitresp.WedHrs === undefined || Submitresp.NBWedHrs === undefined) {
            if (Submitresp.WedHrs != undefined) {
                vm.Billablewednesday = Submitresp.WedHrs;
                vm.NonBillablewednesday = 0;
                vm.TotalhrsWednesday = Submitresp.WedHrs;
            }
            else if (Submitresp.NBWedHrs != undefined) {
                vm.Billablewednesday = 0;
                vm.NonBillablewednesday = Submitresp.NBWedHrs;
                vm.TotalhrsWednesday = Submitresp.NBWedHrs;
            }
            else {
                vm.Billablewednesday = 0;
                vm.NonBillablewednesday = 0;
                vm.TotalhrsWednesday = null;
            }
        }
        else {
            vm.Billablewednesday = Submitresp.WedHrs;
            vm.NonBillablewednesday = Submitresp.NBWedHrs;
            vm.TotalhrsWednesday = Submitresp.WedHrs + Submitresp.NBWedHrs;
        }
        // Calculate total thursday  hours
        if (Submitresp.ThuHrs === undefined || Submitresp.NBThuHrs === undefined) {
            if (Submitresp.ThuHrs != undefined) {
                vm.Billablethursday = Submitresp.ThuHrs;
                vm.NonBillablethursday = 0;
                vm.TotalhrsThursday = Submitresp.ThuHrs;
            }
            else if (Submitresp.NBThuHrs != undefined) {
                vm.Billablethursday = 0;
                vm.NonBillablethursday = Submitresp.NBThuHrs;
                vm.TotalhrsThursday = Submitresp.NBThuHrs;
            }
            else {
                vm.Billablethursday = 0;
                vm.NonBillablethursday = 0;
                vm.TotalhrsThursday = null;
            }
        }
        else {
            vm.Billablethursday = Submitresp.ThuHrs;
            vm.NonBillablethursday = Submitresp.NBThuHrs;
            vm.TotalhrsThursday = Submitresp.ThuHrs + Submitresp.NBThuHrs;
        }
        if (Submitresp.FriHrs === undefined || Submitresp.NBFriHrs === undefined) {
            if (Submitresp.FriHrs != undefined) {
                vm.BillableFriday = Submitresp.FriHrs;
                vm.NonBillableFriday = 0;
                vm.TotalhrsFriday = Submitresp.FriHrs;
            }
            else if (Submitresp.NBFriHrs != undefined) {
                vm.BillableFriday = 0;
                vm.NonBillableFriday = Submitresp.NBFriHrs;
                vm.TotalhrsFriday = Submitresp.NBFriHrs;
            }
            else {
                vm.BillableFriday = 0;
                vm.NonBillableFriday = 0;
                vm.TotalhrsFriday = null;
            }
        }
        else {
            vm.BillableFriday = Submitresp.FriHrs;
            vm.NonBillableFriday = Submitresp.NBFriHrs;
            vm.TotalhrsFriday = Submitresp.FriHrs + Submitresp.NBFriHrs;
        }
        vm.TotalhrsTimesheet = vm.TotalhrsFriday + vm.TotalhrsThursday + vm.TotalhrsWednesday + vm.TotalhrsTuesday + vm.TotalhrsMonday;
        vm.TotalBillableHrs = vm.BillableFriday + vm.Billablethursday + vm.Billablewednesday + vm.Billabletuesday + vm.BillableMonday;
        vm.TotalNonBillableHrs = vm.NonBillableFriday + vm.NonBillablethursday + vm.NonBillablewednesday + vm.NonBillabletuesday + vm.NonBillableMonday;

        if (Submitresp.ddlProject === undefined)
            alert("Please select project");
        else if (Submitresp.ddlTasks === undefined)
            alert("Please select task");
        else if (vm.TotalhrsMonday < 8)
            alert("Please make total hours of Monday atleast 8 to submit timesheet");
        else if (vm.TotalhrsTuesday < 8)
            alert("Please make total hours of Tuesday atleast 8 to submit timesheet");
        else if (vm.TotalhrsWednesday < 8)
            alert("Please make total hours of Wednesday atleast 8 to submit timesheet");
        else if (vm.TotalhrsThursday < 8)
            alert("Please make total hours of Thursday atleast 8 to submit timesheet");
        else if (vm.TotalhrsFriday < 8)
            alert("Please make total hours of Friday atleast 8 to submit timesheet");
        else {
            spcrud.update($http, vm.EmployeeTimesheetList, vm.SavedTimesheetId, {
                //'Employee/Id':vm.loggedInUserName,
                'Submitted_x0020_Status': 'Submitted',
                'TotalhrsMonday': vm.TotalhrsMonday,
                'TotalhrsTuesday': vm.TotalhrsTuesday,
                'TotalhrsWednesday': vm.TotalhrsWednesday,
                'TotalhrsThursday': vm.TotalhrsThursday,
                'TotalhrsFriday': vm.TotalhrsFriday,
                'TotalhrsTimesheet': vm.TotalhrsTimesheet,
                'Billable_x0020_Hours': vm.TotalBillableHrs,
                'Non_x0020_Billable_x0020_Hours': vm.TotalNonBillableHrs,
            }).then(function (SubmitEmployeeTimesheetresponse) {
                // alert("Timesheet submitted successfully");
                vm.SubmittedTimesheetId = SubmitEmployeeTimesheetresponse.data.d.Id;
                spcrud.update($http, vm.TimesheetList, vm.SubmittedTimesheetId, {
                    //'Employee/Id':vm.loggedInUserName,
                    'Mondayhrs': vm.BillableMonday.toString(),
                    'Mondaydesc': 'Monday description',
                    'Tuesdayhrs': vm.BillableTuesday.toString(),
                    'Tuesdaydesc': 'tuesday description',
                    'Wednesdayhrs': vm.BillableWednesday.toString(),
                    'Wednesdaydesc': 'wednesday description',
                    'Thursdayhrs': vm.BillableThursday.toString(),
                    'Thursdaydesc': 'Thursday description',
                    'Fridayhrs': vm.BillableFriday.toString(),
                    'Fridaydesc': 'Friday description',
                    'Saturdayhrs': vm.BillableSaturday.toString(),
                    'Saturdaydesc': 'saturday description',
                    'Sundayhrs': vm.BillableSunday.toString(),
                    'Sundaydesc': 'Sunday description',
                    'Billable': vm.TotalBillableHrs,
                    'Timesheet_x0020_ID': vm.EmployeeTimesheetId.toString(),
                    'Mondaynbhrs': vm.NonBillableMonday.toString(),
                    'Tuesdaynbhrs': vm.NonBillableTuesday.toString(),
                    'Wednesdaynbhrs': vm.NonBillableWednesday.toString(),
                    'Thursdaynbhrs': vm.NonBillableThursday.toString(),
                    'Fridaynbhrs': vm.NonBillableFriday.toString(),
                    'Saturdaynbhrs': vm.NonBillableSaturday.toString(),
                    'Sundaynbhrs': vm.NonBillableSunday.toString(),
                    'Project_x0020_Timesheet_x0020_St': 'Submitted',
                    //'Approver_x0020_User' : 'ABCD', // people and group column
                    'Mondaydescnb': 'Test',
                    'Tuesdaydescnb': 'Test',
                    'Wednesdaydescnb': 'Test',
                    'Thursdaydescnb': 'Test',
                    'Fridaydescnb': 'Test',
                    'Saturdaydescnb': 'Test',
                    'Sundaydescnb': 'Test',
                    'Timesheet_x0020_Status': 'Submitted'
                }).then(function (SubmitTimesheetresponse) {
                    alert("Timesheet submitted successfully");
                });
            });
        }
    }
    // remove timesheet
    vm.RemoveTimesheeetToolTip = function () {
        if (vm.TimesheetStatus === 'Not Submitted') {
            vm.RemoveIconToolTip = 'Delete Timesheet';
        }
        else if (vm.TimesheetStatus === 'Submitted') {
            vm.RemoveIconStatus === 'Cannot delete timesheet';
        }
    }
    vm.RemoveTimesheet = function (index) {
        // if timesheet if not yet save then delete it directly

        if (vm.TimesheetStatus === 'Not Submitted' || vm.TimesheetStatus === 'New Timesheet') {
            if (confirm("Are you sure you want to delete this Timesheet ? ")) {
                // Pranoti's code
                //vm.readSavedEmployeeTimesheetList();
                //vm.SavedTimesheetId
                // spcrud.del($http, vm.EmployeeTimesheetList, vm.SavedTimesheetId, {
                // }).then(function (DeletedTimesheet) {
                //     alert("Timesheet Deleted successfully");
                //     vm.readSavedEmployeeTimesheetList();
                //     $window.location.reload();
                // });
                // angular.element(TimesheetDivId).remove(); $("div").empty();
                // vm.TimesheetDiv= false;
                vm.TimesheetDivs.splice(index, 1);
                if (vm.TimesheetDivs.length === 0) {
                    vm.TimesheetDivs.push([{}]);
                }

            }
            else {
                vm.readSavedEmployeeTimesheetList();
            }


        }
        else {
            vm.TimesheetDiv = true;
        }
    }

    /* ----------------------------------------------------End------------------------------------------------- */
    vm.getPreviousTimesheet = function () {
        vm.curr = vm.firstday;
        vm.firstday = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 7);
        vm.tue = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 6);
        vm.wed = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 5);
        vm.thu = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 4);
        vm.fri = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 3);
        vm.sat = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 2);
        vm.lastday = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() - 1);
        var ConvertedFirstDay = vm.firstday.format('yyyy-MM-dd');
        vm.DateBox = vm.firstday.format('dd-MM-yyyy');
        vm.readEmployeeLeaves();
        for (i = 0; i < vm.SavedTimeSheet.length; i++) {
            if (vm.SavedTimeSheet[i].Timesheet_x0020_Start_x0020_Date.split('T')[0] === ConvertedFirstDay) {
                vm.SavedPreviousTimesheetId = vm.SavedTimeSheet[i].Id;
                vm.readSavedTimesheetList(vm.SavedPreviousTimesheetId);
                // vm.WeekNumber = vm.SavedTimeSheet[i].WeeK_x0020_Number;
                // vm.TotalMondayhrs = vm.SavedTimeSheet[i].TotalhrsMonday;
                // vm.TotalTuesdayhrs = vm.SavedTimeSheet[i].TotalhrsTuesday;
                // vm.TotalhrsWednesday =vm.SavedTimeSheet[i].TotalhrsWednesday;
                // vm.TotalhrsThursday = vm.SavedTimeSheet[i].TotalhrsThursday;
                // vm.TotalhrsFriday =vm.SavedTimeSheet[i].TotalhrsFriday;
                // vm.TotalhrsTimesheet = vm.SavedTimeSheet[i].TotalhrsTimesheet;
            }
            else {
                vm.TimesheetProject = 'Select'; vm.Timesheettask = 'Select';
                vm.BillableMondayhrs = 0; vm.NonBillableMondayhrs = 0;
                vm.MondayDescription = null; vm.NonBillableMondayDescription = null;
                vm.BillableTuesdayhrs = 0; vm.NonBillableTuesdayhrs = 0;
                vm.Tuesdaydescription = null; vm.NonBillableTuesdayDescription = null;
                vm.BillableWednesdayhrs = 0; vm.NonBillableWednesdayHrs = 0;
                vm.Wednesdaydescription = null; vm.NonBillablewednesdayDescription = null;
                vm.BillableThursdayhrs = 0; vm.NonBillableThursdayHrs = 0;
                vm.thursdaydescription = null; vm.NonBillablethursadayDesription = null;
                vm.BillableFridayhrs = 0; vm.NonBillableFridayHrs = 0;
                vm.FridayDescription = null; vm.NonBillableFridayDescription = null;
                vm.BillableSaturdayHrs = 0; vm.NonBillableSaturdayHrs = 0;
                vm.SaturdayDesription = null; vm.NonBillableSaturdayDesription = null;
                vm.BillableSundayHrs = 0; vm.NonBillableSundayHrs = 0;
                vm.SundayDescription = null; vm.NonBillableSundayDescription = null;
            }
        }
        vm.readHolidayList();
    };
    /* ----------------------------------------------------End------------------------------------------------- */
    vm.getNextTimesheet = function () {
        vm.HolidayTimesheetDiv = false;
        vm.curr = vm.firstday;
        vm.firstday = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 7);
        vm.tue = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 8);
        vm.wed = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 9);
        vm.thu = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 10);
        vm.fri = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 11);
        vm.sat = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 12);
        vm.lastday = new Date(vm.curr.getFullYear(), vm.curr.getMonth(), vm.curr.getDate() + 13);
        var ConvertedFirstDay = vm.firstday.format('yyyy-MM-dd');
        vm.DateBox = vm.firstday.format('dd-MM-yyyy');
        vm.readEmployeeLeaves();
        for (i = 0; i < vm.SavedTimeSheet.length; i++) {
            if (vm.SavedTimeSheet[i].Timesheet_x0020_Start_x0020_Date.split('T')[0] === ConvertedFirstDay) {
                vm.SavedNextTimesheetID = vm.SavedTimeSheet[i].Id;
                vm.readSavedTimesheetList(vm.SavedNextTimesheetID);
                vm.WeekNumber = vm.SavedTimeSheet[i].WeeK_x0020_Number;
                vm.TotalMondayhrs = vm.SavedTimeSheet[i].TotalhrsMonday;
                vm.TotalTuesdayhrs = vm.SavedTimeSheet[i].TotalhrsTuesday;
                vm.TotalhrsWednesday = vm.SavedTimeSheet[i].TotalhrsWednesday;
                vm.TotalhrsThursday = vm.SavedTimeSheet[i].TotalhrsThursday;
                vm.TotalhrsFriday = vm.SavedTimeSheet[i].TotalhrsFriday;
                vm.TotalhrsTimesheet = vm.SavedTimeSheet[i].TotalhrsTimesheet;
            }
            else {
                vm.TimesheetProject = 'Select'; vm.Timesheettask = 'Select';
                vm.BillableMondayhrs = 0; vm.NonBillableMondayhrs = 0;
                vm.MondayDescription = null; vm.NonBillableMondayDescription = null;
                vm.BillableTuesdayhrs = 0; vm.NonBillableTuesdayhrs = 0;
                vm.Tuesdaydescription = null; vm.NonBillableTuesdayDescription = null;
                vm.BillableWednesdayhrs = 0; vm.NonBillableWednesdayHrs = 0;
                vm.Wednesdaydescription = null; vm.NonBillablewednesdayDescription = null;
                vm.BillableThursdayhrs = 0; vm.NonBillableThursdayHrs = 0;
                vm.thursdaydescription = null; vm.NonBillablethursadayDesription = null;
                vm.BillableFridayhrs = 0; vm.NonBillableFridayHrs = 0;
                vm.FridayDescription = null; vm.NonBillableFridayDescription = null;
                vm.BillableSaturdayHrs = 0; vm.NonBillableSaturdayHrs = 0;
                vm.SaturdayDesription = null; vm.NonBillableSaturdayDesription = null;
                vm.BillableSundayHrs = 0; vm.NonBillableSundayHrs = 0;
                vm.SundayDescription = null; vm.NonBillableSundayDescription = null;
            }
        }
        // check for holiday
        //     var Fixed = "Fixed";
        //     var TodayDate = new Date();
        //     vm.Holiday = TodayDate.getDay();
        //     vm.Weekfirstday =  vm.firstday.format('yyyy-MM-dd');
        //     vm.WeekLastday = vm.lastday.format('yyyy-MM-dd');
        //     vm.TodayDateformatted = TodayDate.format('yyyy-MM-dd');
        //     HolidaySelect = 'Holiday_x0020_Type/Id, Holiday_x0020_Type/Title,*';
        //     HolidayExpand = 'Holiday_x0020_Type/Id ,Holiday_x0020_Type/Title';
        //     HolidayFilter = 'Holiday_x0020_Type/Title eq \'' + Fixed + '\'';
        //     vm.HolidayOptions = {
        //         select: HolidaySelect,
        //         expand: HolidayExpand,
        //         filter: HolidayFilter
        //     };
        //     spcrud.read($http, vm.HolidayList, vm.HolidayOptions).then(function (Holidayresponse) {
        //     if (Holidayresponse.status === 200)
        //      //vm.HolidayType = Holidayresponse.data.d.results[0].Holiday_x0020_TypeId;
        //     for(i=0;i < Holidayresponse.data.d.results.length ; i++)
        //         {
        //             if(vm.Weekfirstday < Holidayresponse.data.d.results[i].Holiday_x0020_Date.split('T')[0] &&  Holidayresponse.data.d.results[i].Holiday_x0020_Date.split('T')[0] > vm.WeekLastday)
        //                 {
        //                     vm.FixedHolidayForTimesheet = Holidayresponse.data.d.results[i];
        //                     vm.HolidayTimesheetDiv = true;
        //                     //check holiday DAY
        //                     if (vm.Holiday === 1)
        //                          vm.MondayHoliday = 8;
        //                     else if (vm.Holiday === 2)
        //                         vm.TuesdayHoliday = 8;
        //                     else if (vm.Holiday === 3)
        //                         vm.WednesdayHoliday = 8;
        //                     else if (vm.Holiday === 4)
        //                         vm.ThursdayHoliday = 8
        //                     else if(vm.Holiday === 5)
        //                         vm.FridayHoliday = 8;
        //                     else if(vm.Holiday === 6)
        //                          vm.SaturdayHoliday = 8;
        //                     else if(vm.Holiday === 7)
        //                          vm.SundayHoliday = 8;
        //                     break;
        //                 }
        //             else
        //                 {
        //                     vm.HolidayTimesheetDiv = false;
        //                 }
        //             }

        //     }, function (error) {
        //         console.log('error', error);
        //     });


    };

    /* ----------------------------------------------------End------------------------------------------------- */

    vm.AddNewTimesheet = function (TimesheetDivs) {
        if (!vm.checkProjectAndTask()) {
            return;
        }
        vm.pushTimeSheet();
    }
    vm.TimesheetDivs = [{}];
    vm.pushTimeSheet = function () {
        vm.isError = false;
        vm.ProjectManagerName = '';
        vm.TimesheetDivs.push([{
            'ddlProject': ''
        }]);
    }
    vm.checkProjectAndTask = function () {
        vm.isError = false;
        let timesheet = vm.TimesheetDivs[vm.TimesheetDivs.length - 1];
        if (!timesheet.ddlProject || timesheet.ddlProject === null) {
            //vm.isError = true;
            //vm.errorMessage = 'Please select Project';
            alert('Please select Project');
            return false;
        }
        if (!timesheet.ddlTasks || timesheet.ddlTasks === null || timesheet.ddlTasks === '') {
            //vm.isError = true;
            //vm.errorMessage = 'Please select Task';
            alert('Please select Task');
            return false;
        }
        return true;
    }
    vm.timeKeyPress = function (event) {
        if ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode === 58)) {
            return true;
        }
        return false;
    }
    vm.setTimeFormat = function (value, index, property) {
        if (value && value.length > 0 && moment(value, 'HH:mm').isValid()) {
            let time = moment(moment(value, 'HH:mm')).format('HH:mm');
            vm.TimesheetDivs[index][property] = time;
        } else {
            vm.TimesheetDivs[index][property] = '';
        }
        vm.calculateTotalHrs();
    }
    vm.calculateTotalHrs = function () {
        vm.initTotalHour();
        for (let i = 0; i < vm.TimesheetDivs.length; i++) {
            if (vm.TimesheetDivs[i].NBMonHrs && vm.TimesheetDivs[i].NBMonHrs !== null && vm.TimesheetDivs[i].NBMonHrs.length > 0) {
                vm.totalhours.TotalhrsMonday = moment(moment(vm.totalhours.TotalhrsMonday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBMonHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBMonHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].MonHrs && vm.TimesheetDivs[i].MonHrs !== null && vm.TimesheetDivs[i].MonHrs.length > 0) {
                vm.totalhours.TotalhrsMonday = moment(moment(vm.totalhours.TotalhrsMonday, 'HH:mm').add(moment(vm.TimesheetDivs[i].MonHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].MonHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBTueHrs && vm.TimesheetDivs[i].NBTueHrs !== null && vm.TimesheetDivs[i].NBTueHrs.length > 0) {
                vm.totalhours.TotalhrsTuesday = moment(moment(vm.totalhours.TotalhrsTuesday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBTueHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBTueHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].TueHrs && vm.TimesheetDivs[i].TueHrs !== null && vm.TimesheetDivs[i].TueHrs.length > 0) {
                vm.totalhours.TotalhrsTuesday = moment(moment(vm.totalhours.TotalhrsTuesday, 'HH:mm').add(moment(vm.TimesheetDivs[i].TueHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].TueHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBWedHrs && vm.TimesheetDivs[i].NBWedHrs !== null && vm.TimesheetDivs[i].NBWedHrs.length > 0) {
                vm.totalhours.TotalhrsWednesday = moment(moment(vm.totalhours.TotalhrsWednesday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBWedHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBWedHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].WedHrs && vm.TimesheetDivs[i].WedHrs !== null && vm.TimesheetDivs[i].WedHrs.length > 0) {
                vm.totalhours.TotalhrsWednesday = moment(moment(vm.totalhours.TotalhrsWednesday, 'HH:mm').add(moment(vm.TimesheetDivs[i].WedHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].WedHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBThuHrs && vm.TimesheetDivs[i].NBThuHrs !== null && vm.TimesheetDivs[i].NBThuHrs.length > 0) {
                vm.totalhours.TotalhrsThursday = moment(moment(vm.totalhours.TotalhrsThursday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBThuHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBThuHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].ThuHrs && vm.TimesheetDivs[i].ThuHrs !== null && vm.TimesheetDivs[i].ThuHrs.length > 0) {
                vm.totalhours.TotalhrsThursday = moment(moment(vm.totalhours.TotalhrsThursday, 'HH:mm').add(moment(vm.TimesheetDivs[i].ThuHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].ThuHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBFriHrs && vm.TimesheetDivs[i].NBFriHrs !== null && vm.TimesheetDivs[i].NBFriHrs.length > 0) {
                vm.totalhours.TotalhrsFriday = moment(moment(vm.totalhours.TotalhrsFriday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBFriHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBFriHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].FriHrs && vm.TimesheetDivs[i].FriHrs !== null && vm.TimesheetDivs[i].FriHrs.length > 0) {
                vm.totalhours.TotalhrsFriday = moment(moment(vm.totalhours.TotalhrsFriday, 'HH:mm').add(moment(vm.TimesheetDivs[i].FriHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].FriHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBSatHrs && vm.TimesheetDivs[i].NBSatHrs !== null && vm.TimesheetDivs[i].NBSatHrs.length > 0) {
                vm.totalhours.TotalhrsSaturday = moment(moment(vm.totalhours.TotalhrsSaturday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBSatHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBSatHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].SatHrs && vm.TimesheetDivs[i].SatHrs !== null && vm.TimesheetDivs[i].SatHrs.length > 0) {
                vm.totalhours.TotalhrsSaturday = moment(moment(vm.totalhours.TotalhrsSaturday, 'HH:mm').add(moment(vm.TimesheetDivs[i].SatHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].SatHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].NBSunHrs && vm.TimesheetDivs[i].NBSunHrs !== null && vm.TimesheetDivs[i].NBSunHrs.length > 0) {
                vm.totalhours.TotalhrsSunday = moment(moment(vm.totalhours.TotalhrsSunday, 'HH:mm').add(moment(vm.TimesheetDivs[i].NBSunHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].NBSunHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
            if (vm.TimesheetDivs[i].SunHrs && vm.TimesheetDivs[i].SunHrs !== null && vm.TimesheetDivs[i].SunHrs.length > 0) {
                vm.totalhours.TotalhrsSunday = moment(moment(vm.totalhours.TotalhrsSunday, 'HH:mm').add(moment(vm.TimesheetDivs[i].SunHrs, 'HH:mm').hours() * 60 + moment(vm.TimesheetDivs[i].SunHrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
            }
        }
        if (vm.totalhours.TotalhrsMonday !== 0) {
            let hr = vm.totalhours.TotalhrsMonday.split(':')[0];
            let sec = vm.totalhours.TotalhrsMonday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsMonday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }

        }
        if (vm.totalhours.TotalhrsTuesday !== 0) {
            let hr = vm.totalhours.TotalhrsTuesday.split(':')[0];
            let sec = vm.totalhours.TotalhrsTuesday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsTuesday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
        if (vm.totalhours.TotalhrsWednesday !== 0) {
            let hr = vm.totalhours.TotalhrsWednesday.split(':')[0];
            let sec = vm.totalhours.TotalhrsWednesday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsWednesday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
        if (vm.totalhours.TotalhrsThursday !== 0) {
            let hr = vm.totalhours.TotalhrsThursday.split(':')[0];
            let sec = vm.totalhours.TotalhrsThursday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsThursday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
        if (vm.totalhours.TotalhrsFriday !== 0) {
            let hr = vm.totalhours.TotalhrsFriday.split(':')[0];
            let sec = vm.totalhours.TotalhrsFriday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsFriday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
        if (vm.totalhours.TotalhrsSaturday !== 0) {
            let hr = vm.totalhours.TotalhrsSaturday.split(':')[0];
            let sec = vm.totalhours.TotalhrsSaturday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsSaturday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
        if (vm.totalhours.TotalhrsSunday !== 0) {
            let hr = vm.totalhours.TotalhrsSunday.split(':')[0];
            let sec = vm.totalhours.TotalhrsSunday.split(':')[1];
            if (vm.totalhours.TotalhrsTimesheet === 0) {
                vm.totalhours.TotalhrsTimesheet = vm.totalhours.TotalhrsSunday;
            } else {
                let totalHr = vm.totalhours.TotalhrsTimesheet.split(':')[0];
                let totalSec = vm.totalhours.TotalhrsTimesheet.split(':')[1];
                totalHr = parseInt(totalHr) + parseInt(hr);
                if ((parseInt(sec) + parseInt(totalSec)) > 60) {
                    let s = (parseInt(sec) + parseInt(totalSec)) - 60;
                    let h = totalHr + parseInt((parseInt(sec) + parseInt(totalSec)) / 60);
                    vm.totalhours.TotalhrsTimesheet = h + ':' + s;
                } else {
                    vm.totalhours.TotalhrsTimesheet = totalHr + ':' + (parseInt(totalSec) + parseInt(sec) === 60 || parseInt(totalSec) + parseInt(sec) === 0 ? '00' : parseInt(totalSec) + parseInt(sec));
                }
            }
        }
    }
    vm.initTotalHour = function () {
        vm.totalhours = {
            TotalhrsFriday: 0,
            TotalhrsMonday: 0,
            TotalhrsSaturday: 0,
            TotalhrsSunday: 0,
            TotalhrsThursday: 0,
            TotalhrsTuesday: 0,
            TotalhrsWednesday: 0,
            TotalhrsTimesheet: 0,
            Total: 0
        };
    }
}
/* ----------------------------------------------------------------------------------------------------- */
function modal() {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        // '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
/* ----------------------------------------------------------------------------------------------------- */
angular.module('AddEditTimesheeApp', []).controller('AddEditTimesheetController', AddEditTimesheetController).directive('modal', modal);
