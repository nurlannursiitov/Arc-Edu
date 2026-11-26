import { Classroom } from '../types';

/**
 * GeoDistance & BLE Attendance Verification Service
 * Uses Haversine Formula for geofencing students within classroom radius.
 */

export interface GeofenceCheckResult {
  isWithinRadius: boolean;
  distanceMeters: number;
  allowedRadiusMeters: number;
  status: 'VERIFIED' | 'OUT_OF_RANGE' | 'SIGNAL_LOW';
}

export class RadarService {
  private static readonly EARTH_RADIUS_KM = 6371;

  /**
   * Calculate distance between student coordinates and classroom coordinates in meters
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = this.EARTH_RADIUS_KM * c;

    return Math.round(distanceKm * 1000);
  }

  /**
   * Verify whether student is inside active classroom geofence
   */
  static verifyClassroomPresence(
    studentLat: number,
    studentLon: number,
    classroom: Classroom
  ): GeofenceCheckResult {
    const distanceMeters = this.calculateDistance(
      studentLat,
      studentLon,
      classroom.latitude,
      classroom.longitude
    );

    const allowedRadius = classroom.allowed_radius_meters || classroom.beaconRange || 50;
    const isWithinRadius = distanceMeters <= allowedRadius;

    return {
      isWithinRadius,
      distanceMeters,
      allowedRadiusMeters: allowedRadius,
      status: isWithinRadius ? 'VERIFIED' : 'OUT_OF_RANGE',
    };
  }

  private static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
