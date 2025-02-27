import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Grid } from '@mui/material';

function HomePage({setSelectedPage}) {
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Card onClick={() => setSelectedPage("manage-users")}>
            <CardActionArea>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  Manage Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  sfsdfsdf
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card onClick={() => setSelectedPage("category")}>
            <CardActionArea>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  Category Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  sfsdfsdf
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to={"/manage-users"} style={{ textDecoration: "none" }}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Manage Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and manage users in your application.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to={"/category"} style={{ textDecoration: "none" }}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Category Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add, edit, and manage categories in your application.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="div">
                  Product Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your products and inventory here.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid> */}
    </div>
  );
}

export default HomePage;
