function TimeSheetCtl($scope, $http, $timeout, $filter) {
    var vm = $scope;
    vm.spinnerloaded = false;
    vm.loaded = false;
    vm.EmployeeTimeSheetList='Employee Timesheet';
    vm.TimeSheetList='Timesheet';
    var SubmittedCount=0;
    var ApprovedCount=0;
    var PendingCount=0;
    var NSubmittedCount=0;
    var TotalCount=0; 
    var PartiallyApprovedCount=0;
    var RejectedCount=0;
    vm.IsDefault=true;
    vm.IsSubmitted=false;
    vm.IsApproved=false;
    vm.IsPending=false;
    vm.IsNSubmitted=false;
    vm.SingleUserTimeSheets='';
    vm.SubmittedData=[];    
    vm.ApprovedData=[];
    vm.PendingData=[];
    vm.NotSubmittedData=[];  
    vm.sortReverse  = false;
    vm.groupedItems = [];
   vm.itemsPerPage = 10;
    vm.pagedItems = [];
    vm.currentPage = 0;
    vm.Data='';
    vm.filteredItems = []; 
    $scope.page = 1;
    $scope.itemsDisplay = 3
    vm.DatalistEMPTimeSheet='';
    var count=10;

    vm.Submitted='Submitted';
    vm.Approved='Approved';
    vm.NotSubmitted='Not Submitted'
    vm.Pending='Pending';
    vm.PartiallyApproved='Partially Approved';
    vm.Rejected='Rejected';
    vm.TimeData=[];
   // var startdate= "2017-02-27";
 

 vm.getLoggedInUser=function(){
        spcrud.getCurrentUser($http).then(function(LogResponse){
            if(LogResponse.status === 200)
                    var myJSON = JSON.stringify(LogResponse.data.d);
                    vm.loginData=LogResponse.data.d;
                    console.log('looggg',vm.loginData);
                    vm.CurrentLoggedInUser = LogResponse.data.d.Title;
                    // var EmpId= LogResponse.data.d.Id;
                    // vm.abcd=parseInt(EmpId);
                   
                    vm.GetEmpID(vm.CurrentLoggedInUser);
                    //vm.readMissingData(vm.abcd);
        },function(error){
            //console.log('error',error);
        });
    };
   
 vm.getLoggedInUser();


    vm.GetEmpID=function(CurrentLoggedInUser){
                 commentSelect = 'Approver_x0020_User/Title,*';
                commentExpand = 'Approver_x0020_User/Title';
                //approvedFilter = 'Title eq \'' + vm.empIDDD + '\'';
                approvedFilter = 'Employee_x0020_Name eq \'' + vm.CurrentLoggedInUser + '\'';
                 StartDate='Start_x0020_Date desc';
                var OptFilter = {
                    select: commentSelect,
                    expand: commentExpand,
                    filter: approvedFilter ,
                    orderby: StartDate,
                 };     
            spcrud.read($http, vm.EmployeeTimeSheetList, OptFilter).then(function(resp) {
            if (resp.status === 200)
                var myJSON = JSON.stringify(resp.data.d.results);
                vm.List = resp.data.d.results;
                vm.EmpID = resp.data.d.results[0].Title;
                console.log('bhai bhai',vm.EmpID);
                vm.readData(vm.EmpID);

            });  
    }
    vm.readData=function(EmpID){
                commentSelect = 'Approver_x0020_User/Title,*';
                commentExpand = 'Approver_x0020_User/Title';
              //approvedFilter = 'Employee_x0020_Name eq \'' + vm.CurrentLoggedInUser + '\'';
                approvedFilter = 'Title eq \'' + vm.EmpID + '\'';
                StartDate='Start_x0020_Date desc';
                var Options = {
                    select: commentSelect,
                    expand: commentExpand,
                    filter: approvedFilter,
                    orderby: StartDate,
                };     
       
        spcrud.read($http, vm.EmployeeTimeSheetList,Options).then(function(EmpResponse) {
            if (EmpResponse.status === 200)  
                var myJSON = JSON.stringify(EmpResponse.data.d.results);
                vm.DatalistEMPTimeSheet = EmpResponse.data.d.results;
                console.log('vm.DatalistEMPTimeSheet',vm.DatalistEMPTimeSheet);
                 vm.empIDDD = EmpResponse.data.d.results[0].Title;
                 console.log('vm.empIDDD',vm.empIDDD);
               
                for(i=0; i<EmpResponse.data.d.results.length; i++)
                    {
                        var TotalCount=EmpResponse.data.d.results.length;
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Submitted')
                        {
                            SubmittedCount++;  
                        }
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Approved')
                        {
                            ApprovedCount++;
                        }
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Pending')
                        {
                            PendingCount++;
                        }
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Not Submitted')
                        {
                            NSubmittedCount++;
                        }
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Partially Approved')
                        {
                            PartiallyApprovedCount++;
                        }
                        if(EmpResponse.data.d.results[i].Submitted_x0020_Status == 'Rejected')
                        {
                            RejectedCount++;
                        }
                    }
                vm.Count={
                            SubmittedCount:SubmittedCount,
                            ApprovedCount:ApprovedCount,
                            PendingCount:PendingCount,
                            NSubmittedCount:NSubmittedCount,
                            PartiallyApprovedCount:PartiallyApprovedCount,
                            RejectedCount:RejectedCount,
                            TotalCount:TotalCount
                        };
                vm.spinnerloaded = true;
                vm.groupToPages(vm.DatalistEMPTimeSheet);
             
            },function(error) {
                //console.log('error', error);
            });       
};    
   
    vm.getTimeSheetData=function(Status){ 
        vm.Status=Status;   

        if(vm.Status==undefined)
            {
                vm.groupToPages(vm.DatalistEMPTimeSheet);
            }
        else
            {
                
                for(i=0; i < vm.DatalistEMPTimeSheet.length; i++)
                        {
                            if( vm.DatalistEMPTimeSheet[i].Submitted_x0020_Status == vm.Status)
                            {                                   
                                vm.TimeData.push(vm.DatalistEMPTimeSheet[i]);
                            // vm.IsSubmitted=true;
                            }
                        }
                  vm.groupToPages(vm.TimeData);
                  vm.page=1
            }
           
               // console.log('final array',vm.TimeData);
                vm.TimeData=[];
        };
    


vm.showFIlter=function(count){
    vm.itemsPerPage=count;
    console.log('currentPage',vm.currentPage);
    if(vm.currentPage!=0)
        {
             vm.currentPage = 0;
        }
    
    if(vm.Status !=undefined)
        {
            vm.itemsPerPage=count;
            vm.getTimeSheetData(vm.Status);
            vm.page = 1;
        }
    else
        {
            vm.groupToPages(vm.DatalistEMPTimeSheet);
            vm.page = 1;
        }
   
}


    vm.groupToPages = function(Data) {
        vm.FinalData=Data;
        vm.pagedItems = [];
         if(vm.currentPage!=0)
        {
             vm.currentPage = 0;
        }
    
        for (var i = 0; i < vm.FinalData.length; i++) {
            if (i % vm.itemsPerPage === 0) {
                vm.pagedItems[Math.floor(i / vm.itemsPerPage)] = [vm.FinalData[i]];
            } else {
                vm.pagedItems[Math.floor(i / vm.itemsPerPage)].push(vm.FinalData[i]);
            }
        }
      
    };

    vm.range = function(start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    vm.prevPage = function() {
        if (vm.currentPage > 0) {
            vm.currentPage--;
        }
    };

    vm.nextPage = function() {
        if (vm.currentPage < vm.pagedItems.length - 1) {
            vm.currentPage++;
        }
    };

    vm.setPage = function() {
        vm.currentPage = this.n;
    };

    vm.filterItems= function(filterText){
    vm.filterText=filterText;
    var data = $filter('filter')(vm.DatalistEMPTimeSheet,vm.filterText, false,'Approver_x0020_User');
    vm.groupToPagesFilter(data);
    vm.page = 1;
};

vm.groupToPagesFilter = function(data) {
        vm.pagedItems = [];
        vm.filt=data;
        for (var i = 0; i < vm.filt.length; i++) {
            if (i % vm.itemsPerPage === 0) {
                vm.pagedItems[Math.floor(i / vm.itemsPerPage)] = [vm.filt[i]];
            } else {
                vm.pagedItems[Math.floor(i / vm.itemsPerPage)].push(vm.filt[i]);
            }
        }
        

    };

}
angular.module('TimeSheetApp',[]).controller('TimeSheetCtl', TimeSheetCtl );



// vm.getSubmittedTimeSheetData=function(DatalistEMPTimeSheet){    
    //         for(i=0; i < vm.DatalistEMPTimeSheet.length; i++)
    //                 {
    //                     if( vm.DatalistEMPTimeSheet[i].Submitted_x0020_Status == 'Submitted')
    //                     {                                   
    //                         vm.SubmittedData.push(vm.DatalistEMPTimeSheet[i]);
    //                        // vm.IsSubmitted=true;
    //                     }
    //                 }
    //     vm.SubmittedTimesheet=true;
    //     vm.PendingTimesheet=false;
    //     vm.ApprovedTimesheet=false;
    //     vm.NotSubmittedTimesheet=false;
    //     vm.AllTimesheet=false;
    //         vm.groupToPages(vm.SubmittedData);
    //         vm.NewSubmittedData=vm.SubmittedData;
    //         console.log('final array',vm.SubmittedData);
    //         vm.SubmittedData=[];
    // };
    // vm.getApprovedTimeSheetData=function(DatalistEMPTimeSheet){
    //         for(i=0; i < vm.DatalistEMPTimeSheet.length; i++)
    //                 {
    //                     if( vm.DatalistEMPTimeSheet[i].Submitted_x0020_Status == 'Approved')
    //                     {  
    //                         vm.ApprovedData.push(vm.DatalistEMPTimeSheet[i]);
    //                         //vm.IsApproved=true;
    //                     }
    //                 }
    //         vm.SubmittedTimesheet=false;
    //         vm.PendingTimesheet=false;
    //         vm.ApprovedTimesheet=true;
    //         vm.NotSubmittedTimesheet=false;
    //         vm.AllTimesheet=false;
    //         vm.groupToPages(vm.ApprovedData);
    //         vm.NewApprovedData=vm.ApprovedData;
    //         console.log('approved array',vm.ApprovedData);
    //         vm.ApprovedData=[];
    // };
    // vm.getPendingTimeSheetData=function(DatalistEMPTimeSheet){
    //         for(i=0; i < vm.DatalistEMPTimeSheet.length; i++)
    //                 {
    //                     if( vm.DatalistEMPTimeSheet[i].Submitted_x0020_Status == 'Pending')
    //                     {   
    //                         vm.PendingData.push(vm.DatalistEMPTimeSheet[i]);
    //                        //vm.IsPending=true;
    //                     }
    //                 }
    //     vm.SubmittedTimesheet=false;
    //     vm.PendingTimesheet=true;
    //     vm.ApprovedTimesheet=false;
    //     vm.NotSubmittedTimesheet=false;
    //     vm.AllTimesheet=false;
    //                 vm.groupToPages(vm.PendingData);
    //                 vm.NewPendingData=vm.PendingData;
    //                 console.log('Pending array',vm.PendingData);
    //               vm.PendingData=[];
    // };
    // vm.getNSubmittedTimeSheetData=function(DatalistEMPTimeSheet){ 
    //         for(i=0; i < vm.DatalistEMPTimeSheet.length; i++)
    //                 {
    //                     if( vm.DatalistEMPTimeSheet[i].Submitted_x0020_Status == 'Not Submitted')
    //                     {    
    //                         vm.NotSubmittedData.push(vm.DatalistEMPTimeSheet[i]);
    //                        // vm.IsNSubmitted=true;
    //                     }
    //                 }
    //     vm.SubmittedTimesheet=false;
    //     vm.PendingTimesheet=false;
    //     vm.ApprovedTimesheet=false;
    //     vm.NotSubmittedTimesheet=true;
    //     vm.AllTimesheet=false;
    //                 vm.groupToPages(vm.NotSubmittedData);
    //                 vm.NewNotSubmittedData=vm.NotSubmittedData;
    //                 console.log('Not submitted array',vm.NotSubmittedData);
    //                 vm.NotSubmittedData=[];                 
    // };