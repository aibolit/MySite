package mysite

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:"site")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
