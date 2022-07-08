import React, { Component } from 'react'

class SubNavBarComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                  <div class="row">
                  <div class="col-lg-6 mx-auto">
                    <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                        <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                            <li class="nav-item"> <a data-toggle="pill" href="#" class="nav-link active "> <i class="fas fa-credit-card mr-2"></i> Home</a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#" class="nav-link "> <i class="fab fa-paypal mr-2"></i> Issue Items </a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#n" class="nav-link "> <i class="fas fa-mobile-alt mr-2"></i> Inform Supplier</a> </li>
                        </ul>
                    </div>
                    </div>
                    </div>
            </div>
        )
    }
}

export default SubNavBarComponent
