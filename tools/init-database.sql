CREATE USER dbuser WITH PASSWORD 'password';
CREATE DATABASE cluster lc_collate 'fi_FI.UTF-8' lc_ctype 'fi_FI.UTF-8' encoding 'UTF8' template template0;
GRANT ALL PRIVILEGES ON DATABASE cluster TO dbuser;
CREATE DATABASE cluster_test lc_collate 'fi_FI.UTF-8' lc_ctype 'fi_FI.UTF-8' encoding 'UTF8' template template0;
GRANT ALL PRIVILEGES ON DATABASE cluster TO dbuser;
