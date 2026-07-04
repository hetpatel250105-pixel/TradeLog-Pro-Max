import "./Layout.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

function Layout({ children }) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="layout-content">

                <Topbar />

                <main className="page-content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default Layout;