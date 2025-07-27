//Permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]');
    buttonSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        const permissions = [];
        const rows = tablePermissions.querySelectorAll('[data-name]');
        rows.forEach(row => {
            const permissionName = row.getAttribute('data-name');
            const inputs = row.querySelectorAll("input");
            if (permissionName == "id") {
                inputs.forEach(input => {
                    const id = input.value.trim();
                    permissions.push({
                        id: id,
                        permissions: [],
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    const isChecked = input.checked;
                    if (isChecked) {
                        permissions[index].permissions.push(permissionName)
                    }
                });
                if (permissions.length > 0) {
                    const formChangePermissions = document.querySelector('#form-change-permissions');
                    const inputPermissions = formChangePermissions.querySelector('input[name="permissions"]');
                    inputPermissions.value = JSON.stringify(permissions);
                    formChangePermissions.submit();
                }
            }
        });
    })
}
//End Permissions

//Permissions data default
const dataRecords = document.querySelector('[data-records]');
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'));
    const tablePermissions = document.querySelector('[table-permissions]');
    records.forEach((record, index) => {
        const permissions = record.permissions
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const inputs = row.querySelectorAll("input")[index];
            inputs.checked = true;
        })

    })
}
//End Permissions data default
