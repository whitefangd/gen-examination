enum ROLE {
    ANONYMOUS = "ANONYMOUS",
    USER = "USER"
}

enum ACTION {
    FULL_CONTROL = "FULL_CONTROL",
    ACCESS = "ACCESS",
    READ = "READ",
    CREATE = "CREATE",
    MODIFY = "MODIFY",
    DELETE = "DELETE",
    EXECUTE = "EXECUTE",
    SPECIAL_PERMISSION = "SPECIAL_PERMISSION"
}

const Constant = {
    ROLE,
    ACTION
}

export default Constant