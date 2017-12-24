import React, { Component } from 'react'

export default class CentralizedContainer extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <main id="content" className="widget-login-container" role="main">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-xs-10 col-xl-offset-4 col-md-offset-3 col-xs-offset-1">
                <h5 className="widget-login-logo animated fadeInUp">
                  <i className="fa fa-circle text-gray"></i>
                  forum
                  <i className="fa fa-circle text-warning"></i>
                </h5>

                <section className="widget widget-login animated fadeInUp">
                  <header>
                    <h3>{this.props.title}</h3>
                  </header>

                  <div className="widget-body">

                    <p className="widget-login-info">
                      {this.props.description}
                    </p>

                    {this.props.children}
                  </div>
                </section>
              </div>
            </div>
          </main>

          <footer className="page-footer">
            2017 &copy; Forum app.
          </footer>
        </div>
      </div>
    );
  }
}
