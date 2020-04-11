class approval_list {
    get_department_approval_list(idDepartment){
        return  `SELECT approval_list FROM public.approval_list WHERE id_department = `+idDepartment
    }
}

module.exports = approval_list