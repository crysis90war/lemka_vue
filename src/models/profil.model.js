export default class Profil {

    constructor(email = '',
                username = '',
                first_name = '',
                last_name = '',
                numero_tel = '',
                image = '',
                ref_genre = null,
                is_active = false,
                is_verified = false,
                is_staff = false,
                last_login = '',
                created_at = '',
                update_at = '') {
        this.email = email
        this.username = username
        this.first_name = first_name
        this.last_name = last_name
        this.numero_tel = numero_tel
        this.image = image
        this.ref_genre = ref_genre
        this.is_active = is_active
        this.is_verified = is_verified
        this.is_staff = is_staff
        this.last_login = last_login
        this.created_at = created_at
        this.updated_at = update_at
    }
}